import { GoogleLoginButton } from "@/components/GoogleLoginButton";

export default function Login() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Bienvenido</h1>
                <p className="mb-6 text-gray-600">Inicia sesión con tu cuenta de Google</p>
                <GoogleLoginButton />
            </div>
        </div>
    );
}
