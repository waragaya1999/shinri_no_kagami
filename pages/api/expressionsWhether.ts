import type { NextApiRequest, NextApiResponse } from 'next';
const { cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../../shinri-no-firebase.json'); // 秘密鍵を取得
const admin = require('firebase-admin');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const COLLECTION_NAME = 'expressionsWhether';
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();
  const email = req.body.email;
  const faceImage = req.body.faceImage;
  const angry = req.body.angry;
  const disgusted = req.body.disgusted;
  const fearful = req.body.fearful;
  const happy = req.body.happy;
  const neutral = req.body.neutral;
  const sad = req.body.sad;
  const surprised = req.body.surprised;
  const location = req.body.location;
  const whether = req.body.whether;
  const temp = req.body.temp;
  const humidity = req.body.humidity;
  const pressure = req.body.pressure;
  

  if (req.method === 'POST') {
    try {
      // ログインしていなかったら（ゲストユーザーは）保存しない仕組み
      const querySnapshot = await db.collection('users').where('email', '==', email).get();
      if (querySnapshot.empty) {
        const docRef = db.collection(COLLECTION_NAME).doc();
        const insertData = { 
          email,
          faceImage,
          expressions: {
            angry, 
            disgusted, 
            fearful, 
            happy, 
            neutral, 
            sad, 
            surprised
          },
          whether: {
            location, 
            whether, 
            temp, 
            humidity, 
            pressure
          }
        };
        await docRef.set(insertData);
      }
    } catch (error) {
      console.error("Error in Firestore operation:", error);
    }
  }
  res.status(200);
}