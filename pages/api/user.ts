import type { NextApiRequest, NextApiResponse } from 'next';
const { cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../../shinri-no-firebase.json'); // 秘密鍵を取得
const admin = require('firebase-admin');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const COLLECTION_NAME = 'users';
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();
  const name = req.body.name;
  const email = req.body.email;
  const image = req.body.image;
  

  if (req.method === 'POST') {
    try {
      const querySnapshot = await db.collection(COLLECTION_NAME).where('email', '==', email).get();
      if (querySnapshot.empty) {
        const docRef = db.collection(COLLECTION_NAME).doc();
        const insertData = { name, email, image };
        await docRef.set(insertData);
      }
    } catch (error) {
      console.error("Error in Firestore operation:", error);
    }
  }
  res.status(200);
}