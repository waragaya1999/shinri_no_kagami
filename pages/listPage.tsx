import Header from "@/components/Header"
import Footer from "@/components/Footer"
import List from "@/components/List"
import { useFirestore } from "@/hooks/useFirestore"
import { useRouter } from "next/router"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { useEffect } from "react"
import { ListDto } from "@/types/ListDto"
import { useSession } from "next-auth/react"
import { useModal } from "@/hooks/useModal"

export default function ListPage() {
    const { list, handleList } = useFirestore()
    const { getOtenkiApi, weather, prefecture } = useOtenkiApi()
    const session = useSession()
    const { modalPhoto, setModalPhoto } = useModal()

    useEffect(() => {
        getOtenkiApi()
        handleList(session.data?.user?.email as string).then((res) => {})
    }, [])

    return (
        <>
            <div className={"relative p-4 pb-[10vh]"}>
                <img src={modalPhoto} alt="" />
                {list &&
                    list.map((item, key) => (
                        <List
                            key={key}
                            data={item}
                            setModalPhoto={setModalPhoto}
                        />
                    ))}
            </div>
        </>
    )
}
