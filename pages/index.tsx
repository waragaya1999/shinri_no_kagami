import React, { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js"
import "tailwindcss/tailwind.css"
import { signIn, signOut, useSession } from "next-auth/react"
import axios from "axios"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { useIndexState } from "@/hooks/useIndexState"
import { PhotoCaptureDto } from "@/types/PhotoCaputureDto"
import { ExpressionsDto } from "@/types/ExpressionsDto"
import { CapturedExpression } from "@/types/CaputuredExpressionsDto"
import { useSetUpCamera } from "@/hooks/useSetUpCamera"

// const PhotoCapture: React.FC<PhotoCaptureDto> = ({ onCapture }) => {
//     // カメラ画像をキャプチャして顔の情報を検出する関数
//     const capturePhoto = async () => {
//         // ビデオ要素を取得
//         const video = document.getElementById("video") as HTMLVideoElement
//
//         if (video) {
//             // キャンバスを作成し、ビデオの幅と高さを設定
//             const canvas = document.createElement("canvas")
//             canvas.width = video.videoWidth
//             canvas.height = video.videoHeight
//             // キャンバスにビデオの画像を描画
//             const ctx = canvas.getContext("2d")
//             ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
//             // キャンバスの画像をデータURLとして取得
//             const dataUrl = canvas.toDataURL("image/png")
//
//             // 新しい画像要素を作成し、データURLをソースとして設定
//             const photo = new Image()
//             photo.src = dataUrl
//             photo.onload = async () => {
//                 // 画像が読み込まれたら、顔の検出を行う
//                 const detections = await faceapi
//                     .detectAllFaces(
//                         photo,
//                         new faceapi.TinyFaceDetectorOptions(),
//                     )
//                     .withFaceLandmarks()
//                     .withFaceDescriptors()
//                     .withFaceExpressions()
//
//                 // 顔の検出結果を親コンポーネントに渡す
//                 onCapture(dataUrl, detections)
//             }
//         }
//     }
//
//     return <button onClick={capturePhoto}>写真保存ボタン</button>
// }

// ホーム画面のコンポーネント
export default function Home() {
    const { videoRef, setupCamera } = useSetUpCamera()
    const { expressions, windowSize, handleExpressions, handleResize } =
        useIndexState()

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const tableContainerRef = useRef<HTMLDivElement | null>(null)
    // Googleログイン
    const session = useSession()

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
        handleResize()
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
                                // ctx.fillText(message, x, y);
                            }
                        }
                    }
                })
                //読み取り間隔(1000=1秒)
            }, 10000)
        }

        // 画面がロードされたときに顔の検出を開始する
        detectFace()
    }, [])

    type userDto = {
        name: string
        email: string
        image: string
    }
    const [user, setUser] = useState<userDto>({
        name: session.data?.user?.name || "",
        email: session.data?.user?.email || "",
        image: session.data?.user?.image || "",
    })
    useEffect(() => {
        setUser({
            name: session.data?.user?.name || "",
            email: session.data?.user?.email || "",
            image: session.data?.user?.image || "",
        })
        if (user.name !== "") {
            insertUser()
        }
    }, [session])
    const insertUser = async () => {
        await axios.post("/api/user", {
            name: user.name || "",
            email: user.email || "",
            image: user.image || "",
        })
    }

    return (
        <>
            <div>
                {/* カメラ映像を表示するビデオ要素 */}
                <video
                    id="video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={"w-[94%] m-auto"}
                />
                {/* 顔を検出した結果を描画するキャンバス要素 */}
                {/*<canvas ref={canvasRef} className={""}/>*/}
                {/* 表情情報を表示するコンテナ */}
                <div
                    ref={tableContainerRef}
                    style={{ position: "absolute", top: "0", left: "0" }}
                ></div>
                {/* キャプチャした写真と表情情報を表示する */}
                {capturedPhoto && (
                    <div>
                        <img src={capturedPhoto} alt="Captured" />
                        <div>
                            {capturedExpressions.map((expression, index) => (
                                <div key={index}>
                                    Expression {index + 1}:{" "}
                                    {JSON.stringify(expression.expressions)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* 写真をキャプチャするボタンコンポーネント */}
                {/*<PhotoCapture*/}
                {/*    onCapture={(photo, expressions) => {*/}
                {/*        setCapturedPhoto(photo)*/}
                {/*        setCapturedExpressions(expressions)*/}
                {/*    }}*/}
                {/*/>*/}
            </div>

            {session.data ? (
                <>
                    Signed in as {user.email} <br />
                    <p>name: {user.name}</p>
                    <p>
                        image:
                        <img src={user.image} alt={""} />
                    </p>
                    <button onClick={() => signOut()}>Sign outボタン</button>
                </>
            ) : (
                <>
                    Not signed in <br />
                    <button
                        onClick={() => {
                            signIn()
                        }}
                    >
                        Sign inボタン
                    </button>
                </>
            )}
        </>
    )
}
