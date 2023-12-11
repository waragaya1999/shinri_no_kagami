import React, { useEffect } from "react"
import "tailwindcss/tailwind.css"
import { useIndexState } from "@/hooks/useIndexState"
import { useSetUpCamera } from "@/hooks/useSetUpCamera"
import { usePhotoCapture } from "@/hooks/usePhotoCapture"

// ホーム画面のコンポーネント
export default function Home() {
    const { handleResize } = useIndexState()

    const { capturePhoto, capturedPhoto, capturedExpressions } =
        usePhotoCapture()

    const { videoRef, detectFace } = useSetUpCamera()

    useEffect(() => {
        handleResize()
        detectFace()
    }, [])

    const handleOnClick = () => {
        capturePhoto()
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

                {/* キャプチャした写真と表情情報を表示する */}
                <button onClick={() => handleOnClick()}>
                    capturePhotoTest
                </button>
                {capturedPhoto && (
                    <div>
                        <img src={capturedPhoto} alt="" />
                        <div>
                            {capturedExpressions.map((expression, index) => (
                                <div key={index}>
                                    <p>
                                        Expression {index + 1}:{" "}
                                        {JSON.stringify(expression.expressions)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* 写真撮るボタン　取ったらその画像を表示
            o(>ωω<）o
           */}
        </>
    )
}
