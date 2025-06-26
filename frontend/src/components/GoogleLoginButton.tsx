// src/components/GoogleLoginButton.tsx
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/config";

type GoogleLoginButtonProps = {
    onSuccess: () => void;
};

export function GoogleLoginButton({onSuccess}: GoogleLoginButtonProps) {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Puedes obtener el token JWT de Firebase
            const idToken = await user.getIdToken();

            console.log("Usuario autenticado:", user.displayName);
            console.log("Token Firebase:", idToken);

            // Aquí puedes enviar el idToken a tu backend para validación
            onSuccess();
        } catch (error) {
            console.error("Error al autenticar con Google", error);
        }
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
            Iniciar sesión con Google
        </button>
    );
}
