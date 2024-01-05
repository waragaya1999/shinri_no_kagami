import CapturedPhoto from "@/components/CapturedPhoto"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { usePhotoCapture } from "@/hooks/usePhotoCapture"

export default function CapturedPhotoPage() {
    const { weather, prefecture } = useOtenkiApi()
    const { capturedPhoto } = usePhotoCapture()
    return (
        <>
            <Header />
            <div className="w-[94%] rounded-3xl m-auto bg-gray-200">
                {capturedPhoto && (
                    <CapturedPhoto capturedPhoto={capturedPhoto} />
                )}
            </div>
            <Footer weather={weather} prefecture={prefecture} />
        </>
    )
}
