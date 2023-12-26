import { useEffect } from "react"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { useVideo } from "@/hooks/useVideo"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ExpressionsGraph from "@/components/ExpressionsGraph"
import OtenkiInfo from "@/components/OtenkiInfo"
import "tailwindcss/tailwind.css"
import { useLogin } from "@/hooks/useFirestore"
import List from "@/components/List"

export default function ListPage() {
    const { getList } = useLogin()
    const list = getList()

    return (
        <>
            <Header />
            <div className={"relative z-10 p-4"}>
                {list &&
                    list.map((item, index) => <List key={index} data={item} />)}
            </div>
            <Footer />
        </>
    )
}
