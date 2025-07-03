import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APPROUTES, auth } from "@/config";
import { HelpCircle, Upload, Eye, Scale } from "lucide-react";

export default function Home() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        setUserEmail(user?.email ?? null);
    }, []);

    return (
        <div className="px-4 py-6 flex flex-col items-center">
            {/* Bloque superior: bienvenida */}
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow text-center max-w-md w-full mb-8">
                <h1 className="text-3xl font-bold mb-2 text-white">¡Hola!</h1>
                {userEmail ? (
                    <p className="text-white text-base">
                        Has iniciado sesión como: <strong>{userEmail}</strong>
                    </p>
                ) : (
                    <p className="text-gray-400 text-base">
                        No se ha detectado usuario autenticado.
                    </p>
                )}
            </div>
            {/* Cuadros centrales */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-3xl items-center justify-center">
                <ButtonBox
                    icon={<HelpCircle size={32} />}
                    label="Cómo usar la calculadora"
                    onClick={() => navigate(APPROUTES.HELP)}
                />
                <ButtonBox
                    icon={<Upload size={32} />}
                    label="Subir CSV"
                    onClick={() => navigate(APPROUTES.UPLOAD)}
                />
                <ButtonBox
                    icon={<Eye size={32} />}
                    label="Ver consumos"
                    onClick={() => console.log("Ir a ver consumos")}
                />
                <ButtonBox
                    icon={<Scale size={32} />}
                    label="Comparar consumos"
                    onClick={() => console.log("Ir a comparar")}
                />
            </div>
        </div>
    );
}

type ButtonBoxProps = {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
};

function ButtonBox({ icon, label, onClick }: ButtonBoxProps) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center p-6 bg-gray-800 text-white rounded-2xl shadow hover:bg-gray-700 transition cursor-pointer"
        >
            {icon}
            <span className="mt-3 text-lg font-semibold text-center">{label}</span>
        </button>
    );
}
