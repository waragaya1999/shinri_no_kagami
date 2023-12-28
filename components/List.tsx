import { useDateFormat } from "@/hooks/useDateFormat"
import { useList } from "@/hooks/useLits"
import { ListDto } from "@/types/ListDto"

type Props = {
    data: ListDto
}
export default function List({ data }: Props) {
    const { dateFormatter } = useDateFormat()
    const { formatExpressions } = useList()
    const formattedExpressions = formatExpressions(data.expressions)

    return (
        <div className="m-4 p-4 rounded-2xl bg-slate-800 text-white">
            <div className="flex justify-between">
                <div className=" grid gap-2">
                    <p className=" text-xl">{dateFormatter(data.date)}</p>

                    <div>
                        <div className="flex items-center ">
                            <img
                                src="images/thermometer.svg"
                                alt=""
                                className="h-4"
                            />
                            <p className=" mr-2">{data.temperature}℃</p>
                            <img
                                src="images/humidity.svg"
                                alt=""
                                className="h-4"
                            />
                            <p className=" mr-2">{data.humidity}%</p>
                            <img
                                src="images/location.svg"
                                alt=""
                                className="h-4"
                            />
                            <p>{data.prefecture}</p>
                        </div>

                        <div className="flex items-center">
                            <img
                                src="images/barometer.svg"
                                alt=""
                                className="h-4"
                            />
                            <p className="mr-2">{data.pressure}hPa</p>
                            <img
                                src={`/images/${data.icon}.svg`}
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
                <img src="/images/testImage.svg" alt="" />
            </div>
        </div>
    )
}
