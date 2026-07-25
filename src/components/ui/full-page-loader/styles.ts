import type { SxProps, Theme } from "@mui/material";

export const placeholderContainer: SxProps<Theme> = {
    minHeight: "100vh",
    bgcolor: "background.default",
};

export const loaderContainer: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    bgcolor: "background.default",
    color: "text.primary",
    gap: 2,
};

export const loaderText: SxProps<Theme> = {
    fontWeight: 500,
};
