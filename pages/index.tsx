import { useEffect } from "react"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import Video from "@/components/Video"

export default function Home() {
    const { getOtenkiApi, prefecture, weather } = useOtenkiApi()
    console.log(new Date())

    useEffect(() => {
        getOtenkiApi()
    }, [])

    return (
        <>
            <Video weather={weather} prefecture={prefecture} />
        </>
    )
}
