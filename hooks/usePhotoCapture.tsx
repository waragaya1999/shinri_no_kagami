import { CapturedExpression } from "@/types/CaputuredExpressionsDto"

import * as faceapi from "face-api.js"
import { useState } from "react"

export const usePhotoCapture = () => {
    // 撮影した写真と検出した表情を保持するステート
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>()
    const [capturedExpressions, setCapturedExpressions] = useState<
        CapturedExpression[]
    >([])

    // カメラ画像をキャプチャして顔の情報を検出する関数
    const capturePhoto = () => {
        // ビデオ要素を取得
        const video = document.getElementById("video") as HTMLVideoElement

        if (video) {
            // キャンバスを作成し、ビデオの幅と高さを設定
            const canvas = document.createElement("canvas")
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            // キャンバスにビデオの画像を描画
            const ctx = canvas.getContext("2d")
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
            // キャンバスの画像をデータURLとして取得
            const dataUrl = canvas.toDataURL("image/png")

            // 新しい画像要素を作成し、データURLをソースとして設定
            const photo = new Image()
            photo.src = dataUrl
            photo.onload = async () => {
                // 画像が読み込まれたら、顔の検出を行う
                const detections = await faceapi
                    .detectAllFaces(
                        photo,
                        new faceapi.TinyFaceDetectorOptions(),
                    )
                    .withFaceLandmarks()
                    .withFaceDescriptors()
                    .withFaceExpressions()

                // 顔の検出結果を親コンポーネントに渡す
                setCapturedPhoto(dataUrl)
                setCapturedExpressions(detections)
            }
        }
    }
    return { capturePhoto, capturedPhoto, capturedExpressions }
}
