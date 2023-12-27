import { log } from "console"
import type { NextApiRequest, NextApiResponse } from "next"
const { cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")
const serviceAccount = require("../../shinri-no-firebase.json") // 秘密鍵を取得
const admin = require("firebase-admin")

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const COLLECTION_NAME = "expWea"
    //　初期化する
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: cert(serviceAccount),
        })
    }
    const db = getFirestore()
    const faceImage = req.body.nfaceImageame
    const email = req.body.email
    const expressions = req.body.expressions
    const weather = req.body.weather

    if (req.method === "POST") {
        try {
            const docRef = db.collection(COLLECTION_NAME).doc()
            const insertData = { faceImage, email, expressions, weather }
            console.log(faceImage, email, expressions, weather)

            await docRef.set(insertData)
        } catch (error) {
            console.error("Error in Firestore operation:", error)
        }
    }
    res.status(200)
}
