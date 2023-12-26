import { useEffect } from "react"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { useVideo } from "@/hooks/useVideo"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ExpressionsGraph from "@/components/ExpressionsGraph"
import OtenkiInfo from "@/components/OtenkiInfo"
import "tailwindcss/tailwind.css"

export default function Home() {
    const { getOtenkiApi, muniCd, prefecture, latlon, weather } = useOtenkiApi()
    const { detectFace, expressions, videoRef } = useVideo()

    useEffect(() => {
        getOtenkiApi()
        detectFace()
    }, [])

    console.log(weather?.weather[0].icon)

    return (
        <>
            {!videoRef ||
                (!weather && (
                    <div
                        className={
                            "flex fixed justify-center items-center w-screen h-screen bg-white z-[999]"
                        }
                    >
                        <h1>Loading</h1>
                    </div>
                ))}
            <Header />
            <div className={"relative z-10"}>
                <video
                    id="video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={"w-[94%] rounded-3xl m-auto"}
                />
                <ExpressionsGraph expressions={expressions} />
                <OtenkiInfo weather={weather} prefecture={prefecture} />
            </div>
            <Footer />
        </>
    )
}
