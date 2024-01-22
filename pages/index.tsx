import { useEffect, useState } from "react"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import Video from "@/components/Video"
import Toast from "@/components/Toast"

export default function Home() {
    const { getOtenkiApi, prefecture, weather } = useOtenkiApi()
    const [animation, setAnimation] = useState("animate-slide-bottom")
    const [isToastVisible, setIsToastVisible] = useState(true)

    useEffect(() => {
        getOtenkiApi()
    }, [])

    useEffect(() => {
        const toastTimeout = setTimeout(() => {
            setAnimation("animate-slide-top")
            const hideComponentTimeout = setTimeout(() => {
                setIsToastVisible(false)
            }, 1000)

            return () => clearTimeout(hideComponentTimeout)
        }, 3000)

        return () => {
            clearTimeout(toastTimeout)
        }
    }, [])

    return (
        <>
            <Video weather={weather} prefecture={prefecture} />
            {isToastVisible && (
                <Toast message={"記録しました"} animation={animation} />
            )}
        </>
    )
}
