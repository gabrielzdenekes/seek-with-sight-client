import type { SxProps, Theme } from "@mui/material";
import type { FieldConfig } from "./field.types";

export interface FormState {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
}

export interface GenericFormProps {
    fields: readonly FieldConfig[];
    state: FormState;
    action: (payload: FormData) => void;
    submitLabelKey: string;
    containerSx?: SxProps<Theme>;
    inputSx?: SxProps<Theme>;
    children?: React.ReactNode;
}
