import type { NextApiRequest, NextApiResponse } from "next"
import { DocumentData } from "firebase/firestore"
const { cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")
const serviceAccount = require("../../shinri-no-firebase.json") // 秘密鍵を取得
const admin = require("firebase-admin")

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const COLLECTION_NAME = "expWea/2024"

    // 初期化する
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: cert(serviceAccount),
        })
    }

    const db = getFirestore()

    if (req.method === "GET") {
        try {
            const { email } = req.query
            const data: DocumentData[] = []

            for (let i = 1; i <= 52; i++) {
                const querySnapshot = await db
                    .collection(`${COLLECTION_NAME}/${i}`)
                    .where("email", "==", email)
                    .get()

                querySnapshot.forEach((doc: { data: () => DocumentData }) => {
                    data.push(doc.data())
                })
            }

            res.status(200).json(data)
        } catch (error) {
            console.error("Error getting data from Firestore:", error)
            res.status(500).json({ message: "Internal Server Error" })
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" })
    }
}
