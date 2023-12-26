import { useVideo } from "@/hooks/useVideo"
import { useEffect, useState } from "react"

export default function Video() {
    const { detectFace, expressions, videoRef } = useVideo()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        detectFace()
    }, [])

    return (
        <>
            {isClient && (
                <video
                    id="video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={"w-[94%] rounded-3xl m-auto"}
                />
            )}
        </>
    )
}
