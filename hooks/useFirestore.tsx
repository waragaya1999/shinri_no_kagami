import { useState } from "react"
import { useSession } from "next-auth/react"
import axios, { AxiosResponse } from "axios"
import { ExpWeaFirestoreDto } from "@/types/ExpWeaFirestoreDto"
import { ListDto } from "@/types/ListDto"
import { UserFirestoreDto } from "@/types/userFirestoreDto"

export const useFirestore = () => {
    const session = useSession()
    const [userCollection, setUserCollection] = useState<UserFirestoreDto>()

    const handleUserCollection = () => {
        if (
            session.data?.user?.name &&
            session.data.user.email &&
            session.data.user.image
        ) {
            setUserCollection({
                name: session.data?.user?.name,
                email: session.data?.user?.email,
                image: session.data?.user?.image,
            })
            insertUser(session.data.user as UserFirestoreDto)
        }
    }

    const insertUser = async (userCollection: UserFirestoreDto) => {
        await axios.post("/api/user", {
            name: userCollection.name,
            email: userCollection.email,
            image: userCollection.image,
        })
    }

    const getWeekNumber = (date: Date) => {
        const d = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        )
        const dayNum = d.getUTCDay() || 7
        d.setUTCDate(d.getUTCDate() + 4 - dayNum)
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
        return Math.ceil(
            ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
        )
    }

    const insertCapturedPhoto = async (ex: ExpWeaFirestoreDto) => {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const dayOfWeek = date.getDay()
        const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][
            dayOfWeek
        ]
        const weekNumber = getWeekNumber(date)
        await axios.post("/api/expWea", {
            capturedPhoto: ex.capturedPhoto,
            date: `${year}/${month}/${day}(${dayOfWeekStr})`,
            email: ex.email,
            expressions: ex.expressions,
            weather: ex.weather,
            weekNumber: weekNumber,
        })
    }

    const getList = async (email: string) => {
        const response: AxiosResponse<ListDto[]> = await axios.get(
            `/api/getList?email=${email}`,
        )
        return response.data
    }

    return {
        session,
        userCollection,
        getList,
        handleUserCollection,
        insertCapturedPhoto,
    } as const
}
