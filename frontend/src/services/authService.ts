// src/services/authService.ts
import { BACKEND_URL } from "@/config";

export async function loginWithGoogleToken(token: string) {
    const res = await fetch(`${BACKEND_URL}/users/login`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Error al hacer login");
    }

    return await res.json();
}
