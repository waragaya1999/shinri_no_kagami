import React, { useEffect, useRef, useState } from "react"
import "tailwindcss/tailwind.css"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { useIndexState } from "@/hooks/useIndexState"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useVideo } from "@/hooks/useVideo"
import ExpressionsGraph from "@/components/ExpressionsGraph"

export default function Home() {
    const { expressions, handleExpressions } = useIndexState()
    const { getOtenkiApi, muniCd, prefecture, latlon, weather } = useOtenkiApi()
    const { detectFace, videoRef } = useVideo()

    useEffect(() => {
        getOtenkiApi()
        detectFace()
    }, [])

    return (
        <>
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
                <div className={"fixed z-100 top-[5rem] left-[3rem]"}>
                    {weather?.weather[0].main}
                    <br />
                    {prefecture}
                    <br />
                    {weather?.main.temp &&
                        `${(weather?.main.temp - 273.15).toFixed(1)}℃`}
                    <br />
                    {weather?.main.humidity}%
                    <br />
                    {weather?.main.pressure}hPa
                </div>
            </div>
            <Footer />
        </>
    )
}
