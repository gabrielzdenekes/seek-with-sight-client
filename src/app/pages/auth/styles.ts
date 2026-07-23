import type { SxProps, Theme } from "@mui/material";

export const SOCIAL_COLORS = {
    facebook: { main: "#405a93", hover: "#324a7a" },
    google: { main: "#cb523e", hover: "#b34533" },
};

export const authContainerSx: SxProps<Theme> = {
    minHeight: "100vh",
    backgroundColor: "background.default",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
};

export const authCardSx: SxProps<Theme> = {
    width: "100%",
    maxWidth: 420,
    borderRadius: 2,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    mb: 2,
};

export const roundedInputSx: SxProps<Theme> = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
        borderRadius: "50px",
    },
};

export const baseSocialButtonSx: SxProps<Theme> = {
    color: "#fff",
    textTransform: "none",
    borderRadius: "50px",
    py: 1,
    position: "relative",
    justifyContent: "center",
};

export const socialIconSx: SxProps<Theme> = {
    position: "absolute",
    left: 16,
};
