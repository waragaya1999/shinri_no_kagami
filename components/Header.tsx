import { usePhotoCapture } from "@/hooks/usePhotoCapture"
import { useEffect } from "react"
import { Z_UNKNOWN } from "zlib"
import CapturePhotoButton from "./CapturedPhotoButton"

export default function Header() {
    return (
        <header className="w-full h-16 flex justify-center items-center bg-gray-300 text-4xl text-black z-10"></header>
    )
}
