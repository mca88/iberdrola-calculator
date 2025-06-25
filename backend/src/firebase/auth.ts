import { admin } from "@firebase/firebase";

export async function verifyToken(token: string) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        throw new Error('Token inválido');
    }
}