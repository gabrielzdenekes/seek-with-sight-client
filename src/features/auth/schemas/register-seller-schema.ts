import { z } from "zod";

export const RegisterSellerSchema = z
    .object({
        businessName: z
            .string()
            .min(1, "register.validation.businessName"),

        businessAddress: z
            .string()
            .min(1, "register.validation.businessAddress"),

        taxId: z
            .string()
            .min(1, "register.validation.taxId"),

        email: z
            .email("register.validation.invalidEmail"),

        password: z
            .string()
            .min(6, "register.validation.passwordMin"),

        confirmPassword: z
            .string()
            .min(1, "register.validation.confirmPasswordRequired"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "register.validation.passwordsDoNotMatch",
        path: ["confirmPassword"],
    });

export type RegisterSellerSchemaType = z.infer<typeof RegisterSellerSchema>;

export type RegisterSellerState = {
    errors?: {
        businessName?: string[];
        businessAddress?: string[];
        taxId?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
    success?: boolean;
};
