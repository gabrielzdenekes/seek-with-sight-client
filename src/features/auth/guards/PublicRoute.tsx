import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/useAuth";
import { FullPageLoader } from "@/components/ui/full-page-loader/FullPageLoader";

interface PublicRouteRouteProps {
    redirectPath?: string;
    children?: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteRouteProps> = ({
    redirectPath = "/",
    children,
}) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <FullPageLoader isLoading={isLoading} message="Verifying session..." />;
    }

    if (user) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};
