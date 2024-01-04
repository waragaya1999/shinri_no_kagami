import { useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
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
        const weekNumber = getWeekNumber(date)
        await axios.get(`/api/expWea/${weekNumber}`)
        await axios.post("/api/expWea", {
            capturedPhoto: ex.capturedPhoto,
            date: date,
            email: ex.email,
            expressions: ex.expressions,
            weather: ex.weather,
            weekNumber: weekNumber,
        })
    }

    const getList = () => {
        return testReturnData
    }

    return {
        session,
        userCollection,
        handleUserCollection,
        insertCapturedPhoto,
        getList,
    } as const
}

// これはテストデータ
// これと同じ型のデータを返して欲しい
const testReturnData: ListDto[] = [
    {
        capturedPhoto: "testCapturedPhoto",
        date: new Date(new Date().setDate(new Date().getDate() - 0)),
        weather: {
            temperature: 10,
            pressure: 1020,
            humidity: 40,
            prefecture: "Tokyo",
            icon: "11d",
        },
        expressions: {
            neutral: 10,
            happy: 96,
            sad: 85,
            angry: 38,
            fearful: 82,
            disgusted: 33,
            surprised: 41,
        },
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
        weather: {
            temperature: 10,
            pressure: 1020,
            humidity: 40,
            prefecture: "Kyoto",
            icon: "13d",
        },
        expressions: {
            neutral: 45,
            happy: 81,
            sad: 70,
            angry: 36,
            fearful: 88,
            disgusted: 71,
            surprised: 27,
        },
        capturedPhoto: "testCapturedPhoto",
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        weather: {
            temperature: 10,
            pressure: 1020,
            humidity: 40,
            prefecture: "Hokkaido",
            icon: "50d",
        },
        expressions: {
            neutral: 73,
            happy: 79,
            sad: 32,
            angry: 20,
            fearful: 20,
            disgusted: 69,
            surprised: 76,
        },
        capturedPhoto: "testCapturedPhoto",
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 3)),
        weather: {
            temperature: 10,
            pressure: 1020,
            humidity: 40,
            prefecture: "Hokkaido",
            icon: "50d",
        },
        expressions: {
            neutral: 73,
            happy: 79,
            sad: 32,
            angry: 20,
            fearful: 20,
            disgusted: 69,
            surprised: 76,
        },
        capturedPhoto: "testCapturedPhoto",
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 4)),
        weather: {
            temperature: 10,
            pressure: 1020,
            humidity: 40,
            prefecture: "Hokkaido",
            icon: "50d",
        },
        expressions: {
            neutral: 73,
            happy: 79,
            sad: 32,
            angry: 20,
            fearful: 20,
            disgusted: 69,
            surprised: 76,
        },
        capturedPhoto: "testCapturedPhoto",
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 4)),
        weather: {
            temperature: 10,
            pressure: 1020,
            humidity: 40,
            prefecture: "Hokkaido",
            icon: "50d",
        },
        expressions: {
            neutral: 73,
            happy: 79,
            sad: 32,
            angry: 20,
            fearful: 20,
            disgusted: 69,
            surprised: 76,
        },
        capturedPhoto: "testCapturedPhoto",
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 4)),
        weather: {
            temperature: 10,
            pressure: 1020,
            humidity: 40,
            prefecture: "Hokkaido",
            icon: "50d",
        },
        expressions: {
            neutral: 73,
            happy: 79,
            sad: 32,
            angry: 20,
            fearful: 20,
            disgusted: 69,
            surprised: 76,
        },
        capturedPhoto: "testCapturedPhoto",
    },
]
