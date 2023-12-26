import { useVideo } from "@/hooks/useVideo"
import { useEffect, useState } from "react"
import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import ExpressionsGraph from "@/components/ExpressionsGraph"
import OtenkiInfo from "@/components/OtenkiInfo"

type Props = {
    weather: WeatherInfoDto | undefined
    prefecture: string
}

export default function Video({ weather, prefecture }: Props) {
    const { detectFace, expressions, videoRef } = useVideo()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        detectFace()
    }, [])

    return (
        <div className={"relative"}>
            {isClient && (
                <video
                    id="video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={"w-[94%] rounded-3xl m-auto"}
                />
            )}
            <ExpressionsGraph expressions={expressions} />
            <OtenkiInfo weather={weather} prefecture={prefecture} />
        </div>
    )
}
