import type { NextApiRequest, NextApiResponse } from "next"
const { cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")
const serviceAccount = require("../../shinri-no-firebase.json") // 秘密鍵を取得
const admin = require("firebase-admin")

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const year = new Date().getFullYear()
    const COLLECTION_NAME = `expWea/${year}/${req.body.weekNumber}`

    // 初期化する
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: cert(serviceAccount),
        })
    }

    const db = getFirestore()
    const capturedPhoto = req.body.capturedPhoto
    const date = req.body.date
    const email = req.body.email
    const expressions = req.body.expressions
    const weather = req.body.weather
    console.log(date, email, COLLECTION_NAME)

    if (req.method === "POST") {
        try {
            const querySnapshot = await db
                .collection(COLLECTION_NAME)
                .where("email", "==", email)
                .where("date", "==", date)
                .get()

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref
                console.log("Document data:", querySnapshot.docs[0].ref)
                const updateData = {
                    capturedPhoto,
                    expressions,
                    weather,
                }

                await docRef.update(updateData)
                console.log("Document successfully updated!")
            } else {
                const docRef = db.collection(COLLECTION_NAME).doc()
                const insertData = {
                    capturedPhoto,
                    date,
                    email,
                    expressions,
                    weather,
                }

                await docRef.set(insertData)
            }
        } catch (error) {
            console.error("Error in Firestore operation:", error)
        }
    }
    res.status(200)
}
