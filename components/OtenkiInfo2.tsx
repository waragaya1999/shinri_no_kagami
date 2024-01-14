import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import WeatherIcon from "@/components/atoms/WeatherIcon"

export type WeatherForOtenkiInfoComponent = {
    icon: string
    temperature: number
    humidity: number
    pressure: number
}

type Props = {
    weather: WeatherForOtenkiInfoComponent
    prefecture: string
}

export default function OtenkiInfo({ weather, prefecture }: Props) {
    return (
        <div
            className={
                "absolute flex justify-between w-fit top-[3%] left-[6%] rounded-xl bg-black bg-opacity-30 z-100 p-3"
            }
        >
            <div className={"w-10 mr-2"}>
                {weather.icon && (
                    <img src={`/images/${weather.icon}.svg`} alt={""} />
                )}
            </div>
            <div className={"w-fit text-gray-200"}>
                <div className={"flex items-center"}>
                    {WeatherIcon("location")}
                    <p>{prefecture}</p>
                </div>
                <div className={"flex items-center"}>
                    {WeatherIcon("thermometer")}
                    <p className={"mr-1"}>
                        {weather.temperature && `${weather.temperature}℃`}
                    </p>
                    {WeatherIcon("humidity")}
                    <p>{weather.humidity}%</p>
                </div>
                <div className={"flex items-center"}>
                    {WeatherIcon("barometer")}
                    <p>{weather.pressure}hPa</p>
                </div>
            </div>
        </div>
    )
}
