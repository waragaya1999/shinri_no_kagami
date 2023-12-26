import React, { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js"
import "tailwindcss/tailwind.css"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LoadingModal from "@/components/LoadingModal"
import Video from "@/components/Video"

export default function Home() {
    const { getOtenkiApi, prefecture, weather } = useOtenkiApi()

    useEffect(() => {
        getOtenkiApi()
    }, [])

    return (
        <>
            <LoadingModal weather={weather} />
            <Header />
            <Video weather={weather} prefecture={prefecture} />
            <Footer />
        </>
    )
}
