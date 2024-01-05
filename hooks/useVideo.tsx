import { useRef, useState } from "react"
import * as faceapi from "face-api.js"
import { ExpressionsDto } from "@/types/ExpressionsDto"

// 表情の閾値を設定するオブジェクト
type EmotionThresholds = {
    happy: number
    sad: number
    angry: number
}

export const useVideo = () => {
    const [expressions, setExpressions] = useState<ExpressionsDto>({
        neutral: 0,
        happy: 0,
        sad: 0,
        angry: 0,
        fearful: 0,
        disgusted: 0,
        surprised: 0,
    })
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const streamRef = useRef<MediaStream | null>(null)

    const handleExpressions = (expressions: ExpressionsDto) => {
        setExpressions({
            neutral: Number(expressions.neutral.toFixed(2)),
            happy: Number(expressions.happy.toFixed(2)),
            sad: Number(expressions.sad.toFixed(2)),
            angry: Number(expressions.angry.toFixed(2)),
            fearful: Number(expressions.fearful.toFixed(2)),
            disgusted: Number(expressions.disgusted.toFixed(2)),
            surprised: Number(expressions.surprised.toFixed(2)),
        })
    }

    const setupCamera = async () => {
        const video = videoRef.current
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        const constraints = {
            video: {
                width: { ideal: windowWidth },
                height: { ideal: ((windowHeight - 192) * 100) / 94 },
            },
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia(
                constraints,
            )

            streamRef.current = stream

            if (video) {
                video.srcObject = stream
                video.style.transform = "scaleX(-1)"
            }

            return new Promise<HTMLVideoElement>((resolve) => {
                if (video) {
                    video.onloadedmetadata = () => {
                        resolve(video)
                    }
                }
            })
        } catch (error) {
            console.error("カメラの取得に失敗しました", error)
            // エラー処理
            return null
        }
    }

    async function loadFaceAPIModels() {
        await faceapi.nets.tinyFaceDetector.load("/models")
        await faceapi.nets.faceLandmark68Net.load("/models")
        await faceapi.nets.faceRecognitionNet.load("/models")
        await faceapi.nets.faceExpressionNet.load("/models")
    }

    const intervalId = useRef<NodeJS.Timeout | null>(null)

    const clearCanvas = () => {
        // setIntervalをクリア
        if (intervalId.current) {
            clearInterval(intervalId.current)
            intervalId.current = null
        }

        // Canvasを削除
        const canvas = document.querySelector("canvas")
        if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas)
        }

        // ビデオストリームを停止
        const video = videoRef.current
        if (video && video.srcObject) {
            const stream = video.srcObject as MediaStream
            stream.getTracks().forEach((track) => track.stop())
        }
    }

    const detectFace = async () => {
        await loadFaceAPIModels()
        const video = await setupCamera()
        if (video) {
            await video.play()
        }

        const canvas = faceapi.createCanvasFromMedia(video as HTMLVideoElement)
        if (canvas) {
            canvas.style.position = "absolute"
            canvas.style.top = "0"
            canvas.style.left = "0"
            document.body.append(canvas)
        }

        const displaySize = {
            width: video?.videoWidth || 640,
            height: video?.videoHeight || 480,
        }
        faceapi.matchDimensions(canvas, displaySize)

        intervalId.current = setInterval(async () => {
            const detections = await faceapi
                .detectAllFaces(
                    video as HTMLVideoElement,
                    new faceapi.TinyFaceDetectorOptions(),
                )
                .withFaceLandmarks()
                .withFaceDescriptors()
                .withFaceExpressions()

            // 検出結果をリサイズしてキャンバスに合わせる
            const resizedDetections = faceapi.resizeResults(
                detections,
                displaySize,
            )

            // キャンバスをクリア
            canvas
                ?.getContext("2d")
                ?.clearRect(0, 0, canvas.width, canvas.height)
            // キャンバスに検出結果を描画
            // faceapi.draw.drawDetections(canvas, resizedDetections)

            // 検出結果ごとに処理
            resizedDetections.forEach((detection) => {
                const expressions = detection.expressions
                handleExpressions(expressions)
            })
            //読み取り間隔(1000=1秒)
        }, 1000)
    }

    return {
        expressions,
        videoRef,
        detectFace,
        setupCamera,
        clearCanvas,
    } as const
}
