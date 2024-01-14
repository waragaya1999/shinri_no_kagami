import { ListDto } from "@/types/ListDto"
import List__day from "./Lists__day"
import { useDateFormat } from "@/hooks/useDateFormat"
import { useState } from "react"

type Props = {
    list: ListDto[]
    setCapturedPhotoModalData: (capturedPhotoModalData: ListDto | null) => void
}
export default function List__week({ list, setCapturedPhotoModalData }: Props) {
    const { dateFormatter } = useDateFormat()

    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const mondayThisWeek = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() -
            selectedDate.getDay() +
            (selectedDate.getDay() === 0 ? -6 : 1),
    )
    const mondayNextWeek = new Date(
        mondayThisWeek.getFullYear(),
        mondayThisWeek.getMonth(),
        mondayThisWeek.getDate() + 7,
    )
    const thisWeekList = list.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate >= mondayThisWeek && itemDate < mondayNextWeek
    })

    const groupedByDate = thisWeekList.reduce<{ [key: string]: ListDto[] }>(
        (acc, item) => {
            acc[item.date] = acc[item.date] ? [...acc[item.date], item] : [item]
            return acc
        },
        {},
    )

    const handleLeftArrowOnClick = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() - 7)

        setSelectedDate(newDate)
    }
    const handleRightArrowOnClick = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() + 7)

        setSelectedDate(newDate)
    }

    return (
        <>
            <div className=" ">
                <div className=" flex justify-between items-center h-12 bg-[#726868] text-white text-2xl rounded-t-xl">
                    <img
                        onClick={() => handleLeftArrowOnClick()}
                        src="/images/arrow_left.svg"
                        alt=""
                        className="h-10"
                    />
                    <div>
                        {dateFormatter(mondayThisWeek)} ~{" "}
                        {dateFormatter(mondayNextWeek)}
                    </div>
                    <img
                        onClick={() => handleRightArrowOnClick()}
                        src="/images/arrow_right.svg"
                        alt=""
                        className="h-10"
                    />
                </div>

                <div className="bg-[#D9D9D9] rounded-b-xl p-4">
                    {Object.entries(groupedByDate).map(([date, items]) => (
                        <List__day
                            key={date}
                            date={date}
                            list={items}
                            setCapturedPhotoModalData={
                                setCapturedPhotoModalData
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
