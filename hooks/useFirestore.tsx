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
        const testReturnData: ListDto[] = [
            {
                date: new Date(),
                temperature: 10,
                pressure: 1020,
                humidity: 40,
                location: "Tokyo",
                expressions: {
                    neutral: 0,
                    happy: 1,
                    sad: 0,
                    angry: 0,
                    fearful: 0,
                    disgusted: 0,
                    surprised: 0,
                },
                capturedPhoto: testCapturedPhoto,
            },
            {
                date: new Date(),
                temperature: 10,
                pressure: 1020,
                humidity: 40,
                location: "Kyoto",
                expressions: {
                    neutral: 0,
                    happy: 0,
                    sad: 1,
                    angry: 0,
                    fearful: 0,
                    disgusted: 0,
                    surprised: 0,
                },
                capturedPhoto: testCapturedPhoto,
            },
            {
                date: new Date(),
                temperature: 10,
                pressure: 1020,
                humidity: 40,
                location: "Hokkaido",
                expressions: {
                    neutral: 0,
                    happy: 0,
                    sad: 0,
                    angry: 10,
                    fearful: 0,
                    disgusted: 0,
                    surprised: 0,
                },
                capturedPhoto: testCapturedPhoto,
            },
        ]

        return testReturnData
    }

    return { session, userCollection, handleUserCollection, getList } as const
}

const testCapturedPhoto = ""
