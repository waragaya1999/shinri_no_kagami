import { signOut, useSession } from "next-auth/react"

export default function MyPage() {
    const session = useSession()
    return (
        <>
            {session?.data?.user?.image ? (
                <div className=" w-screen p-4">
                    <div className=" flex flex-col items-center gap-4">
                        <img
                            src={session.data.user.image}
                            alt={session.data.user.image}
                            className={"h-full rounded-full w-[40%] pb-2"}
                        />
                        <p className=" text-3xl">{session.data.user.name}</p>
                        <p>{session.data.user.email}</p>
                        <button
                            onClick={() => signOut()}
                            className=" m-auto h-12 w-40 rounded-3xl text-2xl bg-gray-400 text-white text-nowrap mt-20"
                        >
                            ログアウト
                        </button>
                    </div>
                </div>
            ) : (
                <div className=" w-screen h-screen">
                    <h1 className=" text-2xl mt-40">
                        ログインしなおしてください
                    </h1>
                </div>
            )}
        </>
    )
}
