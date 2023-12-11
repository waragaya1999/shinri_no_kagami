import React, { useEffect } from "react"
import "tailwindcss/tailwind.css"
import { useIndexState } from "@/hooks/useIndexState"
import { useSetUpCamera } from "@/hooks/useSetUpCamera"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { usePhotoCapture } from "@/hooks/usePhotoCapture"
export default function Home() {

    const { capturePhoto, capturedPhoto, capturedExpressions } =
        usePhotoCapture()

    const { videoRef, detectFace } = useSetUpCamera()

    useEffect(() => {
        detectFace()
    }, [])

    const handleOnClick = () => {
        capturePhoto()
    }
    return (
        <>
            <Header />
            <div>
                <video
                    id="video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={"w-[94%] rounded-3xl m-auto"}
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
                <div
                    className={
                        "absolute w-[86%] h-32 bg-blue-50 top-1/2 left-1/2 translate-x-[-50%] translate-y-[160%] rounded-2xl"
                    }
                >
                    <div
                        className={
                            "flex justify-between items-end w-full h-[70%] bg-gray-300 rounded-t-2xl"
                        }
                    >
                        <div
                            className={
                                "flex justify-center items-end w-1/6 h-[90%]"
                            }
                        >
                            <div
                                className={"w-1/3 bg-gray-400 rounded-t"}
                                style={{
                                    height: `${expressions.neutral * 100}%`,
                                }}
                            ></div>
                        </div>
                        <div
                            className={
                                "flex justify-center items-end w-1/6 h-[90%]"
                            }
                        >
                            <div
                                className={"w-1/3 bg-gray-400 rounded-t"}
                                style={{
                                    height: `${expressions.happy * 100}%`,
                                }}
                            ></div>
                        </div>
                        <div
                            className={
                                "flex justify-center items-end w-1/6 h-[90%]"
                            }
                        >
                            <div
                                className={"w-1/3 bg-gray-400 rounded-t"}
                                style={{
                                    height: `${expressions.sad * 100}%`,
                                }}
                            ></div>
                        </div>
                        <div
                            className={
                                "flex justify-center items-end w-1/6 h-[90%]"
                            }
                        >
                            <div
                                className={"w-1/3 bg-gray-400 rounded-t"}
                                style={{
                                    height: `${expressions.angry * 100}%`,
                                }}
                            ></div>
                        </div>
                        <div
                            className={
                                "flex justify-center items-end w-1/6 h-[90%]"
                            }
                        >
                            <div
                                className={"w-1/3 bg-gray-400 rounded-t"}
                                style={{
                                    height: `${expressions.fearful * 100}%`,
                                }}
                            ></div>
                        </div>
                        <div
                            className={
                                "flex justify-center items-end w-1/6 h-[90%]"
                            }
                        >
                            <div
                                className={"w-1/3 bg-gray-400 rounded-t"}
                                style={{
                                    height: `${expressions.surprised * 100}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className={"w-full h-[30%]"}>
                        <ul className={"flex w-full h-full"}>
                            <li
                                className={
                                    "flex w-1/6 items-center justify-center text-2xl"
                                }
                            >
                                😐
                            </li>
                            <li
                                className={
                                    "flex w-1/6 items-center justify-center text-2xl"
                                }
                            >
                                😆
                            </li>
                            <li
                                className={
                                    "flex w-1/6 items-center justify-center text-2xl"
                                }
                            >
                                😭
                            </li>
                            <li
                                className={
                                    "flex w-1/6 items-center justify-center text-2xl"
                                }
                            >
                                😠
                            </li>
                            <li
                                className={
                                    "flex w-1/6 items-center justify-center text-2xl"
                                }
                            >
                                🤪
                            </li>
                            <li
                                className={
                                    "flex w-1/6 items-center justify-center text-2xl"
                                }
                            >
                                😲
                            </li>
                        </ul>
                    </div>
                </div>
                {/* キャプチャした写真と表情情報を表示する */}
                {/*{capturedPhoto && (*/}
                {/*    <div>*/}
                {/*        <img src={capturedPhoto} alt="Captured" />*/}
                {/*        <div>*/}
                {/*            {capturedExpressions.map((expression, index) => (*/}
                {/*                <div key={index}>*/}
                {/*                    Expression {index + 1}:{" "}*/}
                {/*                    {JSON.stringify(expression.expressions)}*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
                {/* 写真をキャプチャするボタンコンポーネント */}
                {/*<PhotoCapture*/}
                {/*    onCapture={(photo, expressions) => {*/}
                {/*        setCapturedPhoto(photo)*/}
                {/*        setCapturedExpressions(expressions)*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
            <Footer />
        </>
    )
}
