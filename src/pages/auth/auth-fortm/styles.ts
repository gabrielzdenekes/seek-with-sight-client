import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/system";

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
