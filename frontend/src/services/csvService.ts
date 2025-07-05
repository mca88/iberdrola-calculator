import { auth, BACKEND_URL } from "@/config";

export async function uploadCSV(file: File, name: string) {
    const fileContent: string = await file.text();
    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuario no autenticado");
    }
    const token = await user.getIdToken();
    const body: string = JSON.stringify({
        file: fileContent,
        name: name,
    });

    const response = await fetch(`${BACKEND_URL}/csv/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: body,
    });
    const responseData = await response.json();

    if (!response.ok) {
        const errorMessage = responseData?.error || "Error al subir el archivo";
        throw new Error(errorMessage);
    }
    return responseData;
}