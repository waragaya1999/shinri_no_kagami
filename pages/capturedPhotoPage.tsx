import CapturedPhoto from "@/components/CapturedPhoto"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"

export default function CapturedPhotoPage() {
    const { weather, prefecture } = useOtenkiApi()
    return (
        <>
            <Header />
            <div className="w-[94%] rounded-3xl m-auto bg-gray-200">
                <CapturedPhoto />
            </div>
            <Footer weather={weather} prefecture={prefecture} />
        </>
    )
}
