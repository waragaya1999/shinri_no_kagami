import React, { useEffect, useRef, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { UserFirestoreDto } from "@/types/userFirestoreDto"
import axios from "axios"

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

    return { session, userCollection, handleUserCollection } as const
}
