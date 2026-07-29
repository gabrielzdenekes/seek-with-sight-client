import type { SxProps, Theme } from "@mui/material";
import type { FieldConfig } from "./field.types";
import type { ZodObject } from "zod";

export interface FormState {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
}

export interface GenericFormProps {
    fields: readonly FieldConfig[];
    schema: ZodObject,
    action: (payload: any) => Promise<any>;
    onFormSuccess?: () => void;
    submitLabelKey: string;
    containerSx?: SxProps<Theme>;
    inputSx?: SxProps<Theme>;
    children?: React.ReactNode;
}
