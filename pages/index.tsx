import { useEffect } from "react"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"

import LoadingModal from "@/components/LoadingModal"
import Video from "@/components/Video"

export default function Home() {
    const { getOtenkiApi, prefecture, weather } = useOtenkiApi()

    useEffect(() => {
        getOtenkiApi()
    }, [])
    return (
        <>
            {weather ? (
                <Video weather={weather} prefecture={prefecture} />
            ) : (
                <LoadingModal />
            )}
        </>
    )
}
