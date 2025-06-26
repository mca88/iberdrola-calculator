// src/pages/Hello.tsx
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hello() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        setUserEmail(user?.email ?? null);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth); 
            navigate("/login");  
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-gray-900 border-gray-700 p-10 rounded-2xl shadow-none max-w-md w-full text-center">
                <h1 className="text-4xl font-bold mb-4">¡Hola!</h1>
                {userEmail ? (
                    <>
                        <p className="text-lg text-white mb-4">
                            Has iniciado sesión como: <strong>{userEmail}</strong>
                        </p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <p className="text-lg text-gray-700">No se ha detectado usuario autenticado.</p>
                )}
            </div>
        </div>
    );
}
