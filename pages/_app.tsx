import { SessionProvider } from "next-auth/react"
import { initializeFirebaseApp } from "../src/lib/firebase/firebase"
import { getApp } from "firebase/app"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { useEffect } from "react"

initializeFirebaseApp()

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: {
    Component: React.ElementType
    pageProps: any
}) {
    console.log(getApp())
    const { getOtenkiApi } = useOtenkiApi()

    useEffect(() => {
        getOtenkiApi()
        console.log("_app useEffect run")
    })
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp
