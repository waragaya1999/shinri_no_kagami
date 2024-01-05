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
import CapturedPhotoModal from "@/components/CapturedPhotoModal"

export default function ListPage() {
    const { list, handleList } = useFirestore()
    const { getOtenkiApi, weather, prefecture } = useOtenkiApi()
    const session = useSession()
    const { capturedPhotoModalData, setCapturedPhotoModalData } = useModal()

    useEffect(() => {
        getOtenkiApi()
        handleList(session.data?.user?.email as string).then((res) => {})
    }, [])

    return (
        <>
            <div className={"relative p-4 pb-[10vh]"}>
                {capturedPhotoModalData && (
                    <CapturedPhotoModal
                        listData={capturedPhotoModalData}
                        setCapturedPhotoModalData={setCapturedPhotoModalData}
                    />
                )}
                {list &&
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
