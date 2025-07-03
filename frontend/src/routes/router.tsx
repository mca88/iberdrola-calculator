// src/routes/index.ts
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Home from "@/pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { APPROUTES } from "@/config";
import HelpPage from "@/pages/Help";
import { Upload } from "lucide-react";
import CSVUpload from "@/pages/Upload";

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
    {
        path: APPROUTES.HELP,
        element: (
            <ProtectedRoute>
                <HelpPage />
            </ProtectedRoute>
        ),
    },
    {
        path: APPROUTES.UPLOAD,
        element: (
            <ProtectedRoute>
                <CSVUpload />
            </ProtectedRoute>
        ),
    }
]);

export default router;
