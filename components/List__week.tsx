import { ListDto } from "@/types/ListDto"
import List__day from "./Lists__day"

type Props = {
    list: ListDto[]
    setCapturedPhotoModalData: (capturedPhotoModalData: ListDto | null) => void
}
export default function List__week({ list, setCapturedPhotoModalData }: Props) {
    const groupedByDate = list.reduce<{ [key: string]: ListDto[] }>(
        (acc, item) => {
            acc[item.date] = acc[item.date] ? [...acc[item.date], item] : [item]
            return acc
        },
        {},
    )
    return (
        <>
            <div className=" ">
                <div className=" flex justify-center items-center h-12 bg-[#726868] text-white text-3xl rounded-t-xl">
                    list
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
