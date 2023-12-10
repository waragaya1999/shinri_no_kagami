import { useRef, useState } from "react"

export const useSetUpCamera = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const setupCamera = async () => {
        const video = videoRef.current
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            })
            if (video) {
                video.srcObject = stream
            }
            return new Promise<HTMLVideoElement>((resolve) => {
                if (video) {
                    video.onloadedmetadata = () => {
                        resolve(video)
                    }
                }
            })
        } else {
            alert("カメラが見つかりません")
        }
    }

    return { videoRef, setupCamera } as const
}
