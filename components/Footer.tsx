import React, { useEffect } from "react"
import { useLogin } from "@/hooks/useLogin"
import { signIn, signOut } from "next-auth/react"

export default function Footer() {
    const { session, userCollection, handleUserCollection } = useLogin()
    useEffect(() => {
        handleUserCollection()
    }, [session])

    return (
        <footer className="fixed bottom-0 w-full h-32 bg-gray-300">
            {/* <div className="flex w-[94%] h-[75%] bg-black m-auto mt-[3%]"></div> */}
            {userCollection ? (
                <>
                    Signed in as {userCollection.email} <br />
                    <p>name: {userCollection.name}</p>
                    image:
                    <img src={userCollection.image} alt={userCollection.name} />
                    <button onClick={() => signOut()}>Sign outボタン</button>
                </>
            ) : (
                <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign inボタン</button>
                </>
            )}
        </footer>
    )
}
