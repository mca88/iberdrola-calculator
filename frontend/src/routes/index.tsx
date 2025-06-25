// src/routes/index.ts
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Hello from "@pages/Hello";
import { ProtectedRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/hello",
        element: (
            <ProtectedRoute>
                <Hello />
            </ProtectedRoute>
        ),
    },
]);

export default router;
