type Props = {
    listData: ListDto
    setCapturedPhotoModalData: (modalData: ListDto | null) => void
}

import { ListDto } from "@/types/ListDto"
import ExpressionsGraph from "./ExpressionsGraph"

export default function CapturedPhotoModal({
    listData,
    setCapturedPhotoModalData,
}: Props) {
    const handleOnClick = () => {
        console.log("handleOnClick run")

        setCapturedPhotoModalData(null)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
            <div className="relative p-6 rounded-lg">
                <div className=" text-right">
                    <button
                        onClick={() => handleOnClick()}
                        className=" bg-white w-6 text-center "
                    >
                        ✖︎
                    </button>
                </div>
                <img
                    src={listData.capturedPhoto}
                    alt=""
                    className=" rounded-3xl m-auto"
                />
                <ExpressionsGraph expressions={listData.expressions} />
            </div>
        </div>
    )
}
