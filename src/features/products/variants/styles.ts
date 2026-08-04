import type { SxProps, Theme } from "@mui/material";

export const sectionContainerSx: SxProps<Theme> = {
    width: "100%"
};

export const variantCardSx: SxProps<Theme> = {
    borderRadius: 2,
    backgroundColor: "background.paper"
};

export const toolbarContainerSx: SxProps<Theme> = {
    border: "1px dashed",
    borderColor: "divider",
    borderRadius: 1,
    p: 2,
    backgroundColor: "action.hover"
};

export const previewGridSx: SxProps<Theme> = {
    display: "flex",
    flexWrap: "wrap",
    gap: 1.5,
    mt: 1
};

export const previewItemSx: SxProps<Theme> = {
    position: "relative",
    width: 72,
    height: 72,
    borderRadius: 1,
    overflow: "hidden",
    border: "1px solid",
    borderColor: "divider"
};

export const previewImageSx: SxProps<Theme> = {
    width: "100%",
    height: "100%",
    objectFit: "cover"
};

export const removeButtonSx: SxProps<Theme> = {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    p: 0.5,
    "&:hover": {
        backgroundColor: "rgba(211, 47, 47, 0.9)"
    }
};
