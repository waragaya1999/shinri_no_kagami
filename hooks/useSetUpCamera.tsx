import { useRef } from "react"

export const useSetUpCamera = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const setupCamera = async () => {
        const video = videoRef.current
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        const constraints = {
            video: {
                width: { ideal: windowWidth },
                height: { ideal: ((windowHeight - 192) * 100) / 94 },
            },
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia(
                constraints,
            )

            if (video) {
                video.srcObject = stream
                video.style.transform = "scaleX(-1)"
            }

            return new Promise<HTMLVideoElement>((resolve) => {
                if (video) {
                    video.onloadedmetadata = () => {
                        resolve(video)
                    }
                }
            })
        } catch (error) {
            console.error("カメラの取得に失敗しました", error)
            // エラー処理
            return null
        }
    }

    return { videoRef, setupCamera } as const
}
