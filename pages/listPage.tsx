import Header from "@/components/Header"
import Footer from "@/components/Footer"
import List from "@/components/List"
import { useFirestore } from "@/hooks/useFirestore"
import { useRouter } from "next/router"

export default function ListPage() {
    const router = useRouter()
    const { weather, prefecture } = router.query
    const { getList } = useFirestore()
    const list = getList()
    const weatherObject = weather ? JSON.parse(weather as string) : null
    const prefectureString = prefecture ? (prefecture as string) : ""

    return (
        <>
            <Header />
            <div className={"relative z-10 p-4"}>
                {list &&
                    list.map((item, key) => <List key={key} data={item} />)}
            </div>
            <Footer weather={weatherObject} prefecture={prefectureString} />
        </>
    )
}
