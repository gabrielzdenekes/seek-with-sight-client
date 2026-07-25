import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDelayedLoading } from "@/shared/hooks/useDelayedLoading";
import { loaderContainer, loaderText, placeholderContainer } from "@/components/ui/full-page-loader/styles";

export interface FullPageLoaderProps {
    isLoading?: boolean;
    delay?: number;
    message?: string;
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({
    isLoading = true,
    delay = 250,
    message,
}) => {
    const shouldShowSpinner = useDelayedLoading(isLoading, delay);

    if (!isLoading) {
        return null;
    }

    if (!shouldShowSpinner) {
        return <Box sx={placeholderContainer} />;
    }

    return (
        <Box sx={loaderContainer}>
            <CircularProgress size={44} thickness={4} />
            {message && (
                <Typography variant="body2" color="text.secondary" sx={loaderText}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};
