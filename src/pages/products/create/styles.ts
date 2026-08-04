import type { SxProps, Theme } from "@mui/material";

export const formContainerSx: SxProps<Theme> = {
    p: 3,
    maxWidth: 1200,
    mx: "auto",
};

export const headerStackSx: SxProps<Theme> = {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
};

export const headerTitleSx: SxProps<Theme> = {
    fontWeight: "bold",
};

export const paperCardSx: SxProps<Theme> = {
    p: 3,
    borderRadius: 2,
};

export const sectionTitleSx: SxProps<Theme> = {
    mb: 2,
};

export const uploadButtonSx: SxProps<Theme> = {
    mb: 2,
};

export const imageScrollStackSx: SxProps<Theme> = {
    overflowX: "auto",
    pb: 1,
};

export const imagePreviewBoxSx: SxProps<Theme> = {
    position: "relative",
    width: 100,
    height: 100,
    flexShrink: 0,
};

export const imagePreviewImgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 8,
};

export const deleteIconButtonSx: SxProps<Theme> = {
    position: "absolute",
    top: -8,
    right: -8,
    bgcolor: "background.paper",
    "&:hover": {
        bgcolor: "background.paper",
    },
};

export const formErrorSx: SxProps<Theme> = {
    mb: 2,
};
