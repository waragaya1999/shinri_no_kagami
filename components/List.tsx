import { useDateFormat } from "@/hooks/useDateFormat"
import { useList } from "@/hooks/useLits"
import { ListDto } from "@/types/ListDto"
import { useFirestore } from "@/hooks/useFirestore"
import { useEffect, useLayoutEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useModal } from "@/hooks/useModal"

type Props = {
    data: ListDto
    setModalPhoto: (capturedPhoto: string) => void
}
export default function List({ data, setModalPhoto }: Props) {
    const { formatExpressions } = useList()
    const formattedExpressions = formatExpressions(data.expressions)

    const handleCapturedPhotoOnClick = () => {
        console.log("handleOnClick run ")
        setModalPhoto(data.capturedPhoto)
    }

    return (
        <div className="m-4 p-4 rounded-2xl bg-slate-800 text-white">
            <div className="flex justify-between items-center">
                <div className=" grid gap-2">
                    <p className=" text-xl">{data.date}</p>

                    <div>
                        <div className="flex items-center ">
                            <img
                                src="images/thermometer.svg"
                                alt=""
                                className="h-4"
                            />
                            <p className=" mr-2">{data.weather.temperature}℃</p>
                            <img
                                src="images/humidity.svg"
                                alt=""
                                className="h-4"
                            />
                            <p className=" mr-2">{data.weather.humidity}%</p>
                            <img
                                src="images/location.svg"
                                alt=""
                                className="h-4"
                            />
                            <p>{data.weather.prefecture}</p>
                        </div>

                        <div className="flex items-center">
                            <img
                                src="images/barometer.svg"
                                alt=""
                                className="h-4"
                            />
                            <p className="mr-2">{data.weather.pressure}hPa</p>
                            <img
                                src={`/images/${data.weather.icon}.svg`}
                                alt={""}
                                className="h-6"
                            />
                        </div>
                    </div>

                    <ul className="grid grid-flow-col gap-1 items-baseline">
                        {formattedExpressions.map((expression, index) => (
                            <li
                                key={index}
                                className={index === 0 ? "text-3xl" : ""}
                            >
                                {expression}
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    onClick={() => handleCapturedPhotoOnClick()}
                    className={"w-[28%] h-28 rounded-xl"}
                    style={{
                        backgroundImage: `url(${data.capturedPhoto})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
                {/*<img src={data.capturedPhoto} alt="" />*/}
            </div>
        </div>
    )
}
