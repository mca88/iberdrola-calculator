// src/routes/index.ts
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Home from "@/pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { APPROUTES } from "@/config";

const router = createBrowserRouter([
    {
        path: APPROUTES.ROOT,
        element: <Navigate to={APPROUTES.HOME} replace />,
    },
    {
        path: APPROUTES.LOGIN,
        element: <Login />,
    },
    {
        path: APPROUTES.HOME,
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
]);

export default router;
