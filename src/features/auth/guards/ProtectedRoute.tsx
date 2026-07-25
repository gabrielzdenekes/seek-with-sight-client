import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/useAuth";

interface ProtectedRouteProps {
    redirectPath?: string;
    children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    redirectPath = "/login",
    children,
}) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div className="loading-spinner">Verifying session...</div>;
    }

    if (!user) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};
