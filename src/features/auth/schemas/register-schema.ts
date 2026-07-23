import { z } from "zod";

export const RegisterSchema = z
    .object({
        email: z
            .email("Invalid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
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
