import admin from 'firebase-admin';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import dotenv from 'dotenv';
dotenv.config();

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

export async function verifyToken(token: string) {
    return admin.auth().verifyIdToken(token);
}

const db = admin.firestore();
export { admin, db };