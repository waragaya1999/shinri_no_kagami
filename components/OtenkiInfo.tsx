import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import WeatherIcon from "@/components/atoms/WeatherIcon"

type Props = {
    weather: WeatherInfoDto | undefined
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
                {weather?.weather[0].icon && (
                    <img
                        src={`/images/${weather?.weather[0].icon}.svg`}
                        alt={""}
                    />
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
                        {weather?.main.temp &&
                            `${(weather?.main.temp - 273.15).toFixed(1)}℃`}
                    </p>
                    {WeatherIcon("humidity")}
                    <p>{weather?.main.humidity}%</p>
                </div>
                <div className={"flex items-center"}>
                    {WeatherIcon("barometer")}
                    <p>{weather?.main.pressure}hPa</p>
                </div>
            </div>
        </div>
    )
}
