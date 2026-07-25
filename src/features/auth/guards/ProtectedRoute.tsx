import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/useAuth";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDelayedLoading } from "@/shared/hooks/useDelayedLoading";

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
    const shouldShowSpinner = useDelayedLoading(isLoading, 250);

    if (isLoading) {
        if (!shouldShowSpinner) {
            return <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }} />;
        }

        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    bgcolor: "background.default",
                    color: "text.primary",
                    gap: 2,
                }}
            >
                <CircularProgress size={44} thickness={4} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Verifying session...
                </Typography>
            </Box>
        );
    }

    if (!user) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};
