import React from "react"
import { WeatherInfoDto } from "@/types/WeatherInfoDto"

type Props = {
    weather: WeatherInfoDto | undefined
    prefecture: string
}

export default function OtenkiInfo({ weather, prefecture }: Props) {
    console.log(weather?.weather[0].icon)

    return (
        <div className={"fixed z-100 top-[5rem] left-[3rem]"}>
            <img src={`/images/${weather?.weather[0].icon}.svg`} alt="" />
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
