type Props = {
    listData: ListDto
    setCapturedPhotoModalData: (modalData: ListDto | null) => void
}

import { ListDto } from "@/types/ListDto"
import ExpressionsGraph from "./ExpressionsGraph"
import OtenkiInfo from "./OtenkiInfo"

export default function CapturedPhotoModal({
    listData,
    setCapturedPhotoModalData,
}: Props) {
    const handleOnClick = () => {
        console.log("handleOnClick run")

        setCapturedPhotoModalData(null)
    }

    return (
        <div className="fixed inset-0 bg-white flex justify-center mt-16 z-10">
            <div className="relative  rounded-lg bg-white ">
                <div className=" text-right">
                    <button
                        onClick={() => handleOnClick()}
                        className=" bg-white text-center text-3xl font-bold z-[9999999]"
                    >
                        ✖︎
                    </button>
                </div>
                <h1 className=" text-center text-2xl font-bold">
                    {listData.date}
                </h1>
                <div className=" relative pt-3 pb-4 ">
                    <img
                        src={listData.capturedPhoto}
                        alt=""
                        className="w-[100%] rounded-3xl m-auto scale-x-[-1]"
                    />
                    {/* Todo これの方がいいらしいです不甲斐ない僕をゆるちてくれ    
                    <div
                        className="w-[100%] h-screen rounded-3xl m-auto"
                        style={{
                            backgroundImage: listData.capturedPhoto,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div> */}

                    <ExpressionsGraph expressions={listData.expressions} />
                    <OtenkiInfo
                        weather={listData.weather}
                        prefecture={listData.weather.location}
                    />
                </div>
            </div>
        </div>
    )
}
