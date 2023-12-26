import { MutableRefObject } from "react"
import { WeatherInfoDto } from "@/types/WeatherInfoDto"

type Props = {
    videoRef: MutableRefObject<HTMLVideoElement | null>
    weather: WeatherInfoDto | undefined
}
export default function LoadingModal({ videoRef, weather }: Props) {
    return (
        <>
            {!videoRef ||
                (!weather && (
                    <div
                        className={
                            "flex fixed justify-center items-center w-screen h-screen bg-white z-[999]"
                        }
                    >
                        <h1>Loading</h1>
                    </div>
                ))}
        </>
    )
}
