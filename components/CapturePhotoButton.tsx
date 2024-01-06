import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import { usePhotoCapture } from "@/hooks/usePhotoCapture"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useFirestore } from "@/hooks/useFirestore"
import { useVideo } from "@/hooks/useVideo"

type Props = {
    weather: WeatherInfoDto | undefined
    prefecture: string
}

export default function CapturePhotoButton({ weather, prefecture }: Props) {
    const { capturePhoto, capturedPhoto, capturedExpressions } =
        usePhotoCapture()
    const { clearCanvas } = useVideo()
    const { insertCapturedPhoto } = useFirestore()
    const session = useSession()
    const handleOnClick = () => {
        capturePhoto()
    }
    useEffect(() => {
        if (
            capturedPhoto &&
            session.data?.user?.email &&
            weather &&
            capturedExpressions[0] !== undefined
        ) {
            // console.log(capturedPhoto)
            console.log("スクショ撮った")

            insertCapturedPhoto({
                capturedPhoto: capturedPhoto,
                email: session.data.user.email,
                expressions: {
                    neutral: Number(
                        capturedExpressions[0].expressions.neutral.toFixed(2),
                    ),
                    happy: Number(
                        capturedExpressions[0].expressions.happy.toFixed(2),
                    ),
                    sad: Number(
                        capturedExpressions[0].expressions.sad.toFixed(2),
                    ),
                    angry: Number(
                        capturedExpressions[0].expressions.angry.toFixed(2),
                    ),
                    fearful: Number(
                        capturedExpressions[0].expressions.fearful.toFixed(2),
                    ),
                    disgusted: Number(
                        capturedExpressions[0].expressions.disgusted.toFixed(2),
                    ),
                    surprised: Number(
                        capturedExpressions[0].expressions.surprised.toFixed(2),
                    ),
                },
                weather: {
                    location: prefecture,
                    weather: weather.weather[0].main,
                    temperature: Number(
                        (weather?.main.temp - 273.15).toFixed(1),
                    ),
                    humidity: weather.main.humidity,
                    pressure: weather.main.pressure,
                    icon: weather.weather[0].icon,
                },
            })
        } else {
            console.log("スクショはまだ準備中")
        }
    }, [capturedPhoto])

    return (
        <button onClick={() => handleOnClick()} className="h-[70%] z-10">
            <img src={"/images/capture.svg"} className="h-full" alt="" />
        </button>
    )
}
