import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const APPROUTES = {
    ROOT: "/",
    HOME: "/home",
    LOGIN: "/login",
    HELP: "/help",
    WATCH: "/consuptions",
    COMPARE: "/compare",
    UPLOAD: "/upload"
} as const;

export const routeTitles: Partial<Record<(typeof APPROUTES)[keyof typeof APPROUTES], string>> = {
    [APPROUTES.HOME]: "Inicio",
    [APPROUTES.HELP]: "Cómo usar la calculadora",
    [APPROUTES.WATCH]: "Ver consumos",
    [APPROUTES.COMPARE]: "Comparar consumos",
    [APPROUTES.UPLOAD]: "Subir fichero CSV"
};

