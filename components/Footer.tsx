import { useLogin } from "@/hooks/useLogin"

export default function Footer() {
    const { session } = useLogin()
    return (
        <footer className={"fixed bottom-0 w-full h-32 bg-gray-300"}>
            <div
                className={"flex  w-[94%] h-[75%] bg-black m-auto mt-[3%]"}
            ></div>
        </footer>
    )
}
