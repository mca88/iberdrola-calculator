import { admin } from "@firebase/firebase";

export async function verifyToken(token: string) {
    return admin.auth().verifyIdToken(token);
}