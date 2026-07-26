import type { SxProps, Theme } from "@mui/material";

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

export const SOCIAL_COLORS = {
    facebook: { main: "#405a93", hover: "#324a7a" },
    google: { main: "#cb523e", hover: "#b34533" },
};
