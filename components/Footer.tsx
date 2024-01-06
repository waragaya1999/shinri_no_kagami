import { useEffect } from "react"
import { useFirestore } from "@/hooks/useFirestore"
import { signIn, signOut } from "next-auth/react"
import CapturePhotoButton from "./CapturePhotoButton"
import { WeatherInfoDto } from "@/types/WeatherInfoDto"
import Link from "next/link"
import { useModal } from "@/hooks/useModal"
import CapturedPhotoModal from "./CapturedPhotoModal"
import { useVideo } from "@/hooks/useVideo"

type Props = {
    weather: WeatherInfoDto | undefined
    prefecture: string
}

export default function Footer({ weather, prefecture }: Props) {
    const { session, userCollection, handleUserCollection } = useFirestore()
    const { capturedPhotoModalData, setCapturedPhotoModalData } = useModal()
    useEffect(() => {
        handleUserCollection()
    }, [session])
    const { clearCanvas } = useVideo()

    return (
        <>
            {capturedPhotoModalData && (
                <CapturedPhotoModal
                    listData={capturedPhotoModalData}
                    setCapturedPhotoModalData={setCapturedPhotoModalData}
                />
            )}
            <footer
                className={
                    "fixed flex justify-center w-full h-[10vh] bg-white bottom-0 z-50"
                }
            >
                <div className="flex justify-between items-center w-[94%] h-[75%] rounded-2xl bg-gray-300 px-6">
                    <Link href={"/"} className={"flex items-center h-full"}>
                        <img src={"/images/home.svg"} className={"h-[70%]"} />
                    </Link>
                    <CapturePhotoButton
                        weather={weather}
                        prefecture={prefecture}
                        setCapturedPhotoModalData={setCapturedPhotoModalData}
                    />
                    <Link
                        href={"/listPage"}
                        className={"flex items-center h-full"}
                    >
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
                            <button
                                className={"h-full"}
                                onClick={() => signIn()}
                            >
                                <img
                                    src={"/images/user.svg"}
                                    className={"h-[70%]"}
                                />
                            </button>
                        </>
                    )}
                </div>
            </footer>
        </>
    )
}
