// src/pages/Hello.tsx
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";

export default function Hello() {
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const user = auth.currentUser;
        setUserEmail(user?.email ?? null);
    }, []);

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-4xl font-bold mb-4">¡Hola!</h1>
                {userEmail ? (
                    <p className="text-lg text-gray-700">Has iniciado sesión como: <strong>{userEmail}</strong></p>
                ) : (
                    <p className="text-lg text-gray-700">No se ha detectado usuario autenticado.</p>
                )}
            </div>
        </div>
    );
}
