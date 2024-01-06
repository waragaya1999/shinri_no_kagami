import List from "@/components/List"
import { useFirestore } from "@/hooks/useFirestore"
import { useEffect, useState } from "react"
import { ListDto } from "@/types/ListDto"
import { useSession } from "next-auth/react"
import { useModal } from "@/hooks/useModal"
import CapturedPhotoModal from "@/components/CapturedPhotoModal"
import List__week from "@/components/List__week"

export default function ListPage() {
    const { getList } = useFirestore()
    const { capturedPhotoModalData, setCapturedPhotoModalData } = useModal()
    const [list, setList] = useState<ListDto[]>()
    const [loading, setLoading] = useState(true)

    const session = useSession()

    useEffect(() => {
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

                {!loading ? (
                    list && (
                        <List__week
                            list={list}
                            setCapturedPhotoModalData={
                                setCapturedPhotoModalData
                            }
                        />
                    )
                ) : (
                    <p>ロード中...</p>
                )}
            </div>
        </>
    )
}
