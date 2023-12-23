import { usePhotoCapture } from "@/hooks/usePhotoCapture"

export default function Header() {
    const { capturePhoto, capturedPhoto } = usePhotoCapture()

    const handleOnClick = () => {
        capturePhoto()
    }

    return (
        <header className="w-full h-16 flex justify-center items-center bg-gray-300 text-4xl text-black z-10">
            <button onClick={() => handleOnClick()} className=" z-10">
                testaaa
            </button>
            {capturedPhoto && <img src={capturedPhoto} alt="" />}
        </header>
    )
}
