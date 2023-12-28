import React, { useEffect, useRef, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { UserFirestoreDto } from "@/types/userFirestoreDto"
import axios from "axios"
import { ListDto } from "@/types/ListDto"

export const useLogin = () => {
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

    const getList = () => {
        // これはテストデータ
        // これと同じ型のデータを返して欲しい
        const testReturnData: ListDto[] = [
            {
                date: new Date(),
                temperature: 10,
                pressure: 1020,
                humidity: 40,
                prefecture: "Tokyo",
                expressions: {
                    neutral: 10,
                    happy: 96,
                    sad: 85,
                    angry: 38,
                    fearful: 82,
                    disgusted: 33,
                    surprised: 41,
                },
                capturedPhoto: "testCapturedPhoto",
                icon: "11d",
            },
            {
                date: new Date(),
                temperature: 10,
                pressure: 1020,
                humidity: 40,
                prefecture: "Kyoto",
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
                icon: "13d",
            },
            {
                date: new Date(),
                temperature: 10,
                pressure: 1020,
                humidity: 40,
                prefecture: "Hokkaido",
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
                icon: "50d",
            },
        ]

        return testReturnData
    }

    return { session, userCollection, handleUserCollection, getList } as const
}

const testCapturedPhoto = ""
