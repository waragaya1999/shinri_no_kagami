import { ExpWeaFirestoreDto } from "@/types/ExpWeaFirestoreDto"
import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import { usePhotoCapture } from "@/hooks/usePhotoCapture"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useFirestore } from "@/hooks/useFirestore"

type Props = {
    weather: WeatherInfoDto | undefined
    prefecture: string
}

export default function CapturePhotoButton({ weather, prefecture }: Props) {
    const { capturePhoto, capturedPhoto, capturedExpressions } =
        usePhotoCapture()
    const { insertCapturedPhoto } = useFirestore()
    const session = useSession()
    const handleOnClick = () => {
        capturePhoto()
    }
    useEffect(() => {
        if (capturedPhoto && session.data?.user?.email && weather) {
            // console.log(capturedPhoto)
            insertCapturedPhoto({
                faceImage: capturedPhoto,
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
                    temp: Number((weather?.main.temp - 273.15).toFixed(1)),
                    humidity: weather.main.humidity,
                    pressure: weather.main.pressure,
                },
            })
        }
    }, [capturedPhoto])

    return (
        <button onClick={() => handleOnClick()} className="h-[70%] z-10">
            <img src={"/images/capture.svg"} className="h-full" alt="" />
        </button>
    )
}
