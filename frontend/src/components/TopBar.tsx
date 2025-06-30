import { APPROUTES, auth, routeTitles } from "@/config";
import { signOut } from "firebase/auth";
import { Home, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TopBar = () => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const title = routeTitles[location.pathname as keyof typeof routeTitles] || "";


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate(APPROUTES.LOGIN);
    };

    return (
        <header className="w-full bg-blue-600 text-white px-4 py-3 shadow-md flex items-center justify-between relative">
            {/* Botón Home */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(APPROUTES.HOME)}>
                <Home className="w-6 h-6" />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-white text-3xl">
                {title}
            </div>

            {/* Perfil + menú */}
            <div className="relative" ref={menuRef}>
                <div
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <User className="w-5 h-5 text-blue-600" />
                </div>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 text-gray-800">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default TopBar;
