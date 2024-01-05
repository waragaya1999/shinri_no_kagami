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
    const { detectFace, expressions, videoRef, clearCanvas } = useVideo()
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

    const handleTestButtonOnClick = () => {
        console.log(videoRef)
        if (videoRef) {
            console.log("videoRef : true")
        } else {
            console.log("videoRef : false")
        }
    }

    return (
        <>
            {isLoading && <LoadingModal />}
            <div className={"relative pt-3"}>
                {isClient && videoRef !== null && (
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
                {!isLoading && (
                    <>
                        <ExpressionsGraph expressions={expressions} />
                        <OtenkiInfo weather={weather} prefecture={prefecture} />
                    </>
                )}
            </div>
            <button onClick={() => clearCanvas()}>てすおt</button>
            <button onClick={() => handleTestButtonOnClick()}>テスト</button>
        </>
    )
}
