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
                            className=" m-auto h-20 w-56 rounded-3xl text-5xl bg-red-600 text-white text-nowrap mt-20"
                        >
                            ログアウト
                        </button>
                    </div>
                </div>
            ) : (
                <div className=" w-screen h-screen bg-red-700">
                    <h1 className="text-white text-9xl">
                        ログインしてから出直せ
                    </h1>
                </div>
            )}
        </>
    )
}
