import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import Footer from "./Footer"
import Header from "./Header"
import React, { useEffect } from "react"

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { getOtenkiApi, weather, prefecture } = useOtenkiApi()

    useEffect(() => {
        getOtenkiApi()
    })
    return (
        <>
            <Header />
            <main className="pt-16">{children}</main>
            <Footer weather={weather} prefecture={prefecture} />
        </>
    )
}

export default Layout
