import Users from "@/components/admin/Admin__Users"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Admin() {
    const session = useSession()
    const router = useRouter()
    const email = session.data?.user?.email

    const adminEmail = "meito.kuri@gmail.com"
    const adminPassword = "pass"
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (session.status === "authenticated" && email !== adminEmail) {
            router.push("/")
        }
    }, [session, router])

    const handleSubmit = () => {
        if (password !== adminPassword) {
            setError(true)
        } else {
            setError(false)
            setIsAdmin(true)
        }
    }

    return (
        <>
            {isAdmin ? (
                <>
                    <h1>Welcome Admin!</h1>
                    <Users />
                </>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
                    <div
                        className="bg-white p-6 rounded shadow-md"
                        style={{ minWidth: "300px" }}
                    >
                        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                        <div className="space-y-4">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-2 border ${
                                    error ? "border-red-500" : "border-gray-300"
                                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            <div className="h-6">
                                {error && (
                                    <p className="text-red-500 text-sm">
                                        Incorrect password!
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
