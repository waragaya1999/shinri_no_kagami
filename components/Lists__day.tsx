import { ListDto } from "@/types/ListDto"
import List from "./List"
import { useState } from "react"

type Props = {
    list: ListDto[]
    date: string
    setCapturedPhotoModalData: (capturedPhotoModalData: ListDto | null) => void
}
export default function List__day({
    list,
    setCapturedPhotoModalData,
    date,
}: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const handlePlusOnClick = () => {
        setIsOpen(true)
    }

    const handleMinusOnClick = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className="flex flex-col gap-2">
                {isOpen ? (
                    <div className="bg-[#726868] p-4 flex flex-col gap-2 rounded-xl">
                        <h1 className=" text-white text-xl text-center pb-2">
                            {date}
                        </h1>
                        {list.map((item, key) => (
                            <List
                                key={key}
                                data={item}
                                setCapturedPhotoModalData={
                                    setCapturedPhotoModalData
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <List
                        key={date}
                        data={list[0]}
                        setCapturedPhotoModalData={setCapturedPhotoModalData}
                    />
                )}
            </div>

            {list.length > 1 && (
                <div className=" w-[100%] flex justify-end -mt-8">
                    {isOpen ? (
                        <img
                            onClick={() => handleMinusOnClick()}
                            src="/images/minus.svg"
                            alt="plus"
                            className="w-8 "
                        />
                    ) : (
                        <>
                            <p className=" text-gray-300 text-sm">
                                {list.length}
                            </p>
                            <img
                                onClick={() => handlePlusOnClick()}
                                src="/images/plus.svg"
                                alt="plus"
                                className="w-8 "
                            />
                        </>
                    )}
                </div>
            )}
        </>
    )
}
