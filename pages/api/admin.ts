import type { NextApiRequest, NextApiResponse } from "next"
const { cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")
const serviceAccount = require("../../shinri-no-firebase.json") // 秘密鍵を取得
const admin = require("firebase-admin")

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const COLLECTION_NAME = "users"

    // Firebase Admin SDK の初期化
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: cert(serviceAccount),
        })
    }

    const db = getFirestore()

    if (req.method === "GET") {
        try {
            const querySnapshot = await db.collection(COLLECTION_NAME).get()
            const users = querySnapshot.docs.map((doc: { data: () => any }) =>
                doc.data(),
            )

            res.status(200).json(users)
        } catch (error) {
            console.error("Error fetching users from Firestore:", error)
            res.status(500).json({ error: "Internal server error" })
        }
    } else {
        res.status(405).json({ error: "Method not allowed" })
    }
}
