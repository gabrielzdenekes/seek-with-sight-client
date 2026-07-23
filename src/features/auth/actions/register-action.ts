import { RegisterSchema, type RegisterState } from "../schemas/register-schema";
import type { AuthContextType } from "../types";

export const registerAction = async (
    registerFn: AuthContextType["register"],
    _: RegisterState,
    formData: FormData
): Promise<RegisterState> => {
    const rawData = Object.fromEntries(formData.entries());

    const validated = RegisterSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
            message: null,
            success: false,
        };
    }

    try {
        await registerFn({
            email: validated.data.email,
            password: validated.data.password,
        });

        return { success: true };
    } catch (err: any) {
        return {
            errors: {},
            message: err?.message || "Registration failed. Please try again.",
            success: false,
        };
    }
};
