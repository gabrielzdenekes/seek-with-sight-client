import type { SxProps, Theme } from "@mui/material";

export type FieldType = "text" | "email" | "password" | "number" | "tel";

export interface FieldConfig {
    name: string;
    labelKey: string;
    type?: FieldType;
    autoComplete?: string;
    sx?: SxProps<Theme>;
}

