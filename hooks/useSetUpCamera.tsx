import { useRef, useState } from "react"
import * as faceapi from "face-api.js"
import { useIndexState } from "./useIndexState"

// 表情の閾値を設定するオブジェクト
interface EmotionThresholds {
    happy: number
    sad: number
    angry: number
}

export const useSetUpCamera = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const setupCamera = async () => {
        const video = videoRef.current
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            })
            if (video) {
                video.srcObject = stream
            }
            return new Promise<HTMLVideoElement>((resolve) => {
                if (video) {
                    video.onloadedmetadata = () => {
                        resolve(video)
                    }
                }
            })
        } else {
            alert("カメラが見つかりません")
        }
    }
    // face-api.jsのモデルをロードする
    async function loadFaceAPIModels() {
        await faceapi.nets.tinyFaceDetector.load("/models")
        await faceapi.nets.faceLandmark68Net.load("/models")
        await faceapi.nets.faceRecognitionNet.load("/models")
        await faceapi.nets.faceExpressionNet.load("/models")
    }

    // 顔を検出して表情を表示する
    const { windowSize, handleExpressions } = useIndexState()
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
            height: video?.videoHeight || windowSize.height * 0.8,
        }
        faceapi.matchDimensions(canvas, displaySize)

        setInterval(async () => {
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
            // faceapi.draw.drawDetections(canvas, resizedDetections);

            // 感情の閾値（※要調整）
            const emotionThresholds: EmotionThresholds = {
                happy: 0.001,
                sad: 0.004,
                angry: 0.004,
            }

            // 検出結果ごとに処理
            resizedDetections.forEach((detection) => {
                const expressions = detection.expressions
                handleExpressions(expressions)

                let message = null

                if (
                    expressions.happy &&
                    expressions.happy > emotionThresholds.happy
                ) {
                    message = "ハッピーな状態です"
                } else if (
                    expressions.sad &&
                    expressions.sad > emotionThresholds.sad
                ) {
                    message = "悲しい状態です"
                } else if (
                    expressions.angry &&
                    expressions.angry > emotionThresholds.angry
                ) {
                    message = "怒りな状態です"
                }
            })
            //読み取り間隔(1000=1秒)
        }, 10000)
    }

    return { videoRef, setupCamera, detectFace } as const
}
