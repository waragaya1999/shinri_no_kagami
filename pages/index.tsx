import React, { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js"
import "tailwindcss/tailwind.css"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { useIndexState } from "@/hooks/useIndexState"
import { CapturedExpression } from "@/types/CaputuredExpressionsDto"
import { useSetUpCamera } from "@/hooks/useSetUpCamera"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ExpressionsGraph from "@/components/ExpressionsGraph"

export default function Home() {
    const { videoRef, setupCamera } = useSetUpCamera()
    const { expressions, handleExpressions } = useIndexState()
    const { getOtenkiApi, muniCd, prefecture, latlon, weather } = useOtenkiApi()

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const tableContainerRef = useRef<HTMLDivElement | null>(null)

    // face-api.jsのモデルをロードする
    async function loadFaceAPIModels() {
        await faceapi.nets.tinyFaceDetector.load("/models")
        await faceapi.nets.faceLandmark68Net.load("/models")
        await faceapi.nets.faceRecognitionNet.load("/models")
        await faceapi.nets.faceExpressionNet.load("/models")
    }

    // 撮影した写真と検出した表情を保持するステート
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>()
    const [capturedExpressions, setCapturedExpressions] = useState<
        CapturedExpression[]
    >([])

    // 表情の閾値を設定するオブジェクト
    interface EmotionThresholds {
        happy: number
        sad: number
        angry: number
    }

    useEffect(() => {
        getOtenkiApi()
    }, [])

    useEffect(() => {
        // 顔を検出して表情を表示する
        async function detectFace() {
            await loadFaceAPIModels()
            const video = await setupCamera()
            if (video) {
                await video.play()
            }

            const canvas = faceapi.createCanvasFromMedia(
                video as HTMLVideoElement,
            )
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

                    // キャンバスとテーブルコンテナが存在する場合キャンバスのコンテキストを取得
                    if (canvas && tableContainerRef.current) {
                        const ctx = canvas.getContext("2d")
                        // コンテキストと検出結果が存在する場合
                        if (ctx && detection.detection) {
                            // メッセージを描画する位置を計算
                            const x =
                                detection.detection.box.x +
                                detection.detection.box.width / 2
                            const y = detection.detection.box.y - 10

                            if (message) {
                                ctx.font = "20px Arial"
                                ctx.fillStyle = "white"
                            }
                        }
                    }
                })
                //読み取り間隔(1000=1秒)
            }, 1000)
        }

        // 画面がロードされたときに顔の検出を開始する
        detectFace()
    }, [])

    return (
        <>
            <Header />
            <div className={"relative z-10"}>
                <video
                    id="video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={"w-[94%] rounded-3xl m-auto"}
                />
                <ExpressionsGraph expressions={expressions} />
                <div className={"fixed z-100 top-[5rem] left-[3rem]"}>
                    {weather?.weather[0].main}
                    <br />
                    {prefecture}
                    <br />
                    {weather?.main.temp &&
                        `${(weather?.main.temp - 273.15).toFixed(1)}℃`}
                    <br />
                    {weather?.main.humidity}%
                    <br />
                    {weather?.main.pressure}hPa
                </div>
            </div>
            <Footer />
        </>
    )
}
