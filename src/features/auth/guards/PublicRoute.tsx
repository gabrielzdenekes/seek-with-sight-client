import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/context/useAuth";

interface PublicRouteProps {
    redirectPath?: string;
    children?: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
    redirectPath = "/",
    children,
}) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="loading-spinner">Verifying session...</div>;
    }

    if (user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};
