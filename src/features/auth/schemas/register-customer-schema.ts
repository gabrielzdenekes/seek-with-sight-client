import { z } from "zod";

export const RegisterCustomerSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "register.validation.firstNameRequired"),

        lastName: z
            .string()
            .min(1, "register.validation.lastNameRequired"),

        phone: z
            .string()
            .min(1, "register.validation.phoneRequired"),

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

export type RegisterCustomerSchemaType = z.infer<typeof RegisterCustomerSchema>;

export type RegisterCustomerState = {
    errors?: {
        firstName?: string[];
        lastName?: string[];
        phone?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
    success?: boolean;
};
