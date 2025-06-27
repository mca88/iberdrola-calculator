import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/config"
import { loginWithGoogleToken } from "@/services/authService";

type GoogleLoginButtonProps = {
    onSuccess: () => void;
    onError: (message: string) => void;
};

export function GoogleLoginButton({onSuccess, onError}: GoogleLoginButtonProps) {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Puedes obtener el token JWT de Firebase
            const idToken = await user.getIdToken();

            const data = await loginWithGoogleToken(idToken);
            console.log("Respuesta del backend:", data);
            onSuccess();
        } catch (error) {
            console.error("Error al autenticar con Google", error);
            onError("El servidor está temporalmente cerrado, por favor, inténtelo más tarde");
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
