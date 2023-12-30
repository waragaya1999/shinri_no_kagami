import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import { useState } from "react"
import * as timers from "timers"

export default function LoadingModal() {
    const [timer, setTimer] = useState(0)
    setInterval(() => {
        const newTimer = timer + 1
        setTimer(newTimer)
    }, 1000)
    return (
        <div
            className={
                "fixed flex justify-center items-center w-screen h-screen bg-white z-[999] mt-[-4rem]"
            }
        >
            <h1>
                Loading
                {timer % 3 === 0 ? "." : timer % 3 === 1 ? ".." : "..."}
            </h1>
        </div>
    )
}
