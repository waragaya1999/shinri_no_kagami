import { useFirestore } from "@/hooks/useFirestore"
import { ListDto } from "@/types/ListDto"
import { useEffect, useState } from "react"
import List from "../List"
import { useModal } from "@/hooks/useModal"
import CapturedPhotoModal from "../CapturedPhotoModal"

type Props = {
    email: string
}

export default function Admin__UserPosted({ email }: Props) {
    const { getList } = useFirestore()
    const [lists, setLists] = useState<ListDto[]>([])
    const [error, setError] = useState<Error | null>(null)
    const { capturedPhotoModalData, setCapturedPhotoModalData } = useModal()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getList(email)
                setLists(data)
            } catch (error) {
                console.error("Failed to fetch lists:", error)
                setError(error as Error)
            }
        }

        fetchData()
    }, [email])

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <>
            <div className="flex flex-col justify-center z-10">
                <h1>UserPosted</h1>
                <p>selectedUser: {email}</p>
                {capturedPhotoModalData && (
                    <CapturedPhotoModal
                        listData={capturedPhotoModalData}
                        setCapturedPhotoModalData={setCapturedPhotoModalData}
                    />
                )}
                <div>
                    {lists.map((list, index) => (
                        <List
                            key={index}
                            data={list}
                            setCapturedPhotoModalData={
                                setCapturedPhotoModalData
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
