import React, { useEffect } from "react"
import { useLogin } from "@/hooks/useFirestore"
import { signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function Footer() {
    const { session, userCollection, handleUserCollection } = useLogin()

    useEffect(() => {
        handleUserCollection()
    }, [session])

    return (
        <footer
            className={"fixed flex justify-center w-full h-[10vh] bottom-0"}
        >
            <div className="flex justify-between items-center w-[94%] h-[75%] rounded-2xl bg-gray-300 px-6">
                <img src={"/images/home.svg"} className={"h-[70%]"} />
                <img src={"/images/capture.svg"} className={"h-[70%]"} />

                {/* Todo レイアウト崩れたわ許して > < */}
                <Link href={"/listPage"} className={"h-[100%]"}>
                    <img src={"/images/record.svg"} className={"h-[70%]"} />
                </Link>
                {userCollection ? (
                    <>
                        <button
                            className={"bg-white"}
                            onClick={() => signOut()}
                        >
                            Sign outボタン
                        </button>
                        <button className={"h-[70%]"}>
                            <img
                                src={userCollection.image}
                                alt={userCollection.name}
                                className={"h-full rounded-full"}
                            />
                        </button>
                    </>
                ) : (
                    <>
                        <button className={"h-full"} onClick={() => signIn()}>
                            <img
                                src={"/images/user.svg"}
                                className={"h-[70%]"}
                            />
                        </button>
                    </>
                )}
            </div>
        </footer>
    )
}
