import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { type JSX } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-gray-900 border-gray-700 p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
                <h1 className="text-4xl font-bold mb-4 text-white">Bienvenido</h1>
                <p className="mb-6 text-gray-400">Inicia sesión con tu cuenta de Google</p>
                <GoogleLoginButton
                    onSuccess={() => navigate("/hello")}
                    onError={(message) => {
                        alert(message)
                    }}
                />

            </div>
        </div>
    );
}
