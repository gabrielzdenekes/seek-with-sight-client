import { z } from "zod";

export const LoginSchema = z.object({
    email: z
        .email("Invalid email address")
        .min(1),

    password: z
        .string()
        .min(1, "Password is required")
});

export type LoginState = {
    errors?: {
        email?: string[];
        password?: string[];
    };

    message?: string | null;

    success?: boolean;
};
