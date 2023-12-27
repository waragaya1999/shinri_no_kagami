import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { UserFirestoreDto } from "@/types/UserFirestoreDto"
import axios from "axios"
import { ExpWeaFirestoreDto } from "@/types/ExpWeaFirestoreDto"

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

    const insertCapturedPhoto = async (ex: ExpWeaFirestoreDto) => {
        console.log(ex.faceImage, ex.email, ex.expressions, ex.weather)

        await axios.post("/api/expWea", {
            faceImage: ex.faceImage,
            email: ex.email,
            expressions: ex.expressions,
            weather: ex.weather,
        })
    }

    return {
        session,
        userCollection,
        handleUserCollection,
        insertCapturedPhoto,
    } as const
}
