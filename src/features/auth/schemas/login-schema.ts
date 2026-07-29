import { z } from "zod";

export const LoginSchema = z.object({
    email: z
        .email("login.validation.invalidEmail")
        .min(1),

    password: z
        .string()
        .min(1, "login.validation.passwordRequired")
});
