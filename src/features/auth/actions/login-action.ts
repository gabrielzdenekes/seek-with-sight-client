import { LoginSchema, type LoginState } from "../schemas/login-schema";
import type { AuthContextType } from "../types";


export const loginAction = async (loginFn: AuthContextType["login"], _: LoginState, formData: FormData): Promise<LoginState> => {
    const rawData = Object.fromEntries(formData.entries());

    const validated = LoginSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
            message: null,
            success: false
        };
    }

    try {
        await loginFn(validated.data);

        return { success: true };
    } catch {
        return {
            errors: {},
            message: "login.validation.failed",
            success: false,
        };
    }
};
