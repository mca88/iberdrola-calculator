// src/routes/ProtectedRoute.tsx
import { useEffect, useState, type JSX } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

export function ProtectedRoute({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthenticated(!!user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (!authenticated) return <Navigate to="/login" replace />;

    return children;
}
