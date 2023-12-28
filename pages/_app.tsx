import { SessionProvider } from "next-auth/react"
import { initializeFirebaseApp } from "../src/lib/firebase/firebase"
import { getApp } from "firebase/app"
import "tailwindcss/tailwind.css"
import Layout from "@/components/Layout"

initializeFirebaseApp()

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: {
    Component: React.ElementType
    pageProps: any
}) {
    console.log(getApp())
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    )
}

export default MyApp
