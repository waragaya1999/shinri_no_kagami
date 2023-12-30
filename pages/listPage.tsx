import Header from "@/components/Header"
import Footer from "@/components/Footer"
import List from "@/components/List"
import { useFirestore } from "@/hooks/useFirestore"
import { useRouter } from "next/router"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { useEffect } from "react"

export default function ListPage() {
    const { getList } = useFirestore()
    const { getOtenkiApi, weather, prefecture } = useOtenkiApi()
    const list = getList()

    useEffect(() => {
        getOtenkiApi()
    }, [])

    return (
        <>
            <div className={"relative p-4 pb-[10vh]"}>
                {list &&
                    list.map((item, key) => <List key={key} data={item} />)}
            </div>
        </>
    )
}
