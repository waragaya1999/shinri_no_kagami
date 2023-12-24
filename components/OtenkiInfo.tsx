import React from "react"
import { WeatherInfoDto } from "@/types/WeatherInfoDto"

type Props = {
    weather: WeatherInfoDto | undefined
    prefecture: string
}

export default function OtenkiInfo({ weather, prefecture }: Props) {
    return (
        <div className={"fixed z-100 top-[5rem] left-[3rem]"}>
            {weather?.weather[0].main}
            <br />
            {prefecture}
            <br />
            {weather?.main.temp &&
                `${(weather?.main.temp - 273.15).toFixed(1)}℃`}
            <br />
            {weather?.main.humidity}%
            <br />
            {weather?.main.pressure}hPa
        </div>
    )
}
