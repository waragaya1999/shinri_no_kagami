import { useState } from "react"

export const useModal = () => {
    const [modalPhoto, setModalPhotoState] = useState("")

    const setModalPhoto = (capturedPhoto: string) => {
        setModalPhotoState(capturedPhoto)
    }

    return {
        modalPhoto,
        setModalPhoto,
    }
}
