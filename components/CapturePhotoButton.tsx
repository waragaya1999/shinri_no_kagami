import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import { usePhotoCapture } from "@/hooks/usePhotoCapture"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useFirestore } from "@/hooks/useFirestore"
import { useVideo } from "@/hooks/useVideo"
import { useCountdown } from "@/hooks/useCountdown"
import CapturedPhotoModal from "./CapturedPhotoModal"
import { useModal } from "@/hooks/useModal"
import { ListDto } from "@/types/ListDto"
import { useDateFormat } from "@/hooks/useDateFormat"

type Props = {
    weather: WeatherInfoDto | undefined
    prefecture: string
    setCapturedPhotoModalData: (modalData: ListDto | null) => void
}

export default function CapturePhotoButton({
    weather,
    prefecture,
    setCapturedPhotoModalData,
}: Props) {
    const { capturePhoto, capturedPhoto, capturedExpressions } =
        usePhotoCapture()
    const { insertCapturedPhoto } = useFirestore()
    const { startCountdown, countdown, isActive } = useCountdown()
    const session = useSession()
    const { dateFormatter } = useDateFormat()
    const { clearCanvas } = useVideo()

    const handleOnClick = () => {
        startCountdown()
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

            const setData: ListDto = {
                date: dateFormatter(new Date()),
                weather: {
                    temperature: weather.main.temp,
                    pressure: weather.main.pressure,
                    humidity: weather.main.humidity,
                    location: prefecture,
                    icon: weather.weather[0].icon,
                },
                expressions: capturedExpressions[0].expressions,
                capturedPhoto: capturedPhoto,
            }
            clearCanvas()
            setCapturedPhotoModalData(setData)
        } else {
            console.log("capturedPhoto: ", capturePhoto)
            console.log("session.data.user.email: ", session.data?.user?.email)
            console.log("weather: ", weather)
            console.log("capturedExpressions[0]", capturedExpressions[0])

            console.log("スクショはまだ準備中")
        }
    }, [capturedPhoto])

    useEffect(() => {
        if (isActive && countdown == 0) {
            console.log("isActive && countdown = 0")
            capturePhoto()
        }
    }, [countdown])

    return (
        <button onClick={() => handleOnClick()} className="h-[70%]">
            {isActive ? (
                countdown == 4 ? (
                    <img
                        src={"/images/takePhoto.svg"}
                        className="h-full"
                        alt=""
                    />
                ) : countdown == 0 ? (
                    <img
                        src={"/images/tokePhoto.svg"}
                        className="h-full"
                        alt=""
                    />
                ) : (
                    <p className=" w-16 text-4xl text-center">{countdown}</p>
                )
            ) : (
                <img src={"/images/capture.svg"} className="h-full" alt="" />
            )}
        </button>
    )
}
