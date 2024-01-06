import Header from "@/components/Header"
import Footer from "@/components/Footer"
import List from "@/components/List"
import { useFirestore } from "@/hooks/useFirestore"
import { useRouter } from "next/router"
import { useOtenkiApi } from "@/hooks/useOtenkiApi"
import { useEffect, useState } from "react"
import { ListDto } from "@/types/ListDto"
import { useSession } from "next-auth/react"
import { useModal } from "@/hooks/useModal"
import CapturedPhotoModal from "@/components/CapturedPhotoModal"

export default function ListPage() {
    const { getList } = useFirestore()
    const { getOtenkiApi, weather, prefecture } = useOtenkiApi()
    const { capturedPhotoModalData, setCapturedPhotoModalData } = useModal()
    const [list, setList] = useState<ListDto[]>([])
    const [loading, setLoading] = useState(true)

    const session = useSession()

    useEffect(() => {
        getOtenkiApi()
        const fetchData = async () => {
            try {
                const fetchedList = await getList(
                    session.data?.user?.email as string,
                )
                setList(fetchedList)
            } catch (error) {
                console.error("Error fetching list:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [session])

    return (
        <>
            <div className={"relative p-4 pb-[10vh]"}>
                {capturedPhotoModalData && (
                    <CapturedPhotoModal
                        listData={capturedPhotoModalData}
                        setCapturedPhotoModalData={setCapturedPhotoModalData}
                    />
                )}
                {!loading &&
                    list &&
                    list.map((item, key) => (
                        <List
                            key={key}
                            data={item}
                            setCapturedPhotoModalData={
                                setCapturedPhotoModalData
                            }
                        />
                    ))}
            </div>
        </>
    )
}
