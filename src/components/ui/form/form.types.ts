import type { ZodObject } from "zod";
import type { ReactNode } from "react";

export interface FormState {
    errors: Record<string, string[] | undefined>;
    message: string | null;
    success: boolean;
}

export interface FormFieldDef {
    name: string;
    labelKey: string;
    type?: "text" | "number" | "select" | "custom" | "email" | "password" | "tel";
    defaultValue?: string | number;
    options?: { value: string | number; labelKey: string }[];
    customRender?: (fieldError?: string) => ReactNode;
    autoComplete?: string;
    sx?: any;
}

export interface FormSectionDef {
    id: string;
    titleKey?: string;
    fields?: FormFieldDef[];
    customRender?: (state: FormState) => ReactNode;
    paperSx?: any;
}

export interface GenericFormProps {
    sections: FormSectionDef[];
    action: <TFormData>(data: TFormData) => Promise<void>;
    schema: ZodObject;
    onFormSuccess?: () => void;
    submitLabelKey: string;
    containerSx?: any;
    inputSx?: any;
    children?: ReactNode;
}
