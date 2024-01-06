import { useVideo } from "@/hooks/useVideo"
import { useEffect, useState } from "react"
import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import ExpressionsGraph from "@/components/ExpressionsGraph"
import OtenkiInfo from "@/components/OtenkiInfo"
import LoadingModal from "./LoadingModal"

type Props = {
    weather: WeatherInfoDto | undefined
    prefecture: string
}

export default function Video({ weather, prefecture }: Props) {
    const { detectFace, expressions, videoRef, clearCanvas, isVideoActive } =
        useVideo()
    const [isClient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsClient(true)
        detectFace()
        return () => {
            clearCanvas()
        }
    }, [])

    const handleLoadedMetadata = () => {
        setIsLoading(false)
    }

    return (
        <>
            {isLoading && <LoadingModal />}
            {isVideoActive ? (
                <div className={"relative pt-3"}>
                    {isClient && (
                        <video
                            id="video"
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={"w-[94%] rounded-3xl m-auto"}
                            onLoadedMetadata={handleLoadedMetadata}
                        />
                    )}
                    {/* ここの書き方くどいけどレイアウトの関係上仕方がなかったんや... */}
                    {!isLoading && weather !== undefined && (
                        <>
                            <ExpressionsGraph expressions={expressions} />
                            <OtenkiInfo
                                weather={{
                                    icon: weather.weather[0].icon,
                                    temperature: weather.main.temp,
                                    humidity: weather.main.humidity,
                                    pressure: weather.main.pressure,
                                }}
                                prefecture={prefecture}
                            />
                        </>
                    )}
                </div>
            ) : (
                <>
                    <h1>カメラが停止しました</h1>
                    <p>ブラウザを更新してください</p>
                </>
            )}

            <button onClick={() => clearCanvas()}>videoの停止ボタン</button>
        </>
    )
}
