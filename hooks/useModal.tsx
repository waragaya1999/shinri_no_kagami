import { ListDto } from "@/types/ListDto"
import { useState } from "react"

export const useModal = () => {
    const [capturedPhotoModalData, setModalPhotoState] =
        useState<ListDto | null>(null)

    const setCapturedPhotoModalData = (modalData: ListDto | null) => {
        setModalPhotoState(modalData)
    }

    return {
        capturedPhotoModalData,
        setCapturedPhotoModalData,
    }
}
