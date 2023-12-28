import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import Footer from "./Footer"
import Header from "./Header"
import { useEffect } from "react"

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { getOtenkiApi, weather, prefecture } = useOtenkiApi()

    useEffect(() => {
        getOtenkiApi()
    })
    return (
        <>
            <Header />
            {/* Footerで隠れちゃうからpbつけました */}
            <main className="pb-40">{children}</main>
            <Footer weather={weather} prefecture={prefecture} />
        </>
    )
}

export default Layout
