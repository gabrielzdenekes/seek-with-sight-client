import { z } from "zod";

export const RegisterSchema = z
    .object({
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

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export type RegisterState = {
    errors?: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
    success?: boolean;
};
