// ユーザー情報を表す型
type User = {
    name: string
    email: string
    image: string
}

import axios from "axios"
import { useEffect, useState } from "react"
import Admin__UserPosted from "./Admin__UserPosted"

export default function Admin__Users() {
    const [users, setUsers] = useState<User[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>("/api/admin")
                setUsers(response.data)
            } catch (error) {
                console.error("Failed to fetch users:", error)
                setError(error as Error)
            }
        }

        fetchUsers()
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    }

    const [selectedUser, setSelectedUser] = useState("")
    const handleUserOnClick = (userEmail: string) => {
        console.log(userEmail)
        setSelectedUser(userEmail)
    }

    return (
        <div className="max-w-2xl mx-auto mb-40">
            {selectedUser !== "" && <Admin__UserPosted email={selectedUser} />}

            <h1 className="text-2xl font-bold my-4">Users</h1>
            <div className="flex flex-col gap-3">
                {users.map((user) => (
                    <div
                        onClick={() => handleUserOnClick(user.email)}
                        key={user.email}
                        className="flex items-center bg-white shadow-md rounded-lg overflow-hidden"
                    >
                        <img
                            src={user.image}
                            alt={user.name}
                            className="h-12 w-12 rounded-full m-2"
                        />
                        <div className="p-2">
                            <p className="text-lg font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-600">
                                {user.email}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
