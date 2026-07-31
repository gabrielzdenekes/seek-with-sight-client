import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/system";

export const authContainerSx: SxProps<Theme> = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    backgroundColor: "background.default",
};

export const authCardSx: SxProps<Theme> = {
    width: "100%",
    maxWidth: 480,
    borderRadius: 3,
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
    overflow: "hidden"
};

export const roundedInputSx: SxProps<Theme> = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 2,
    },
};
