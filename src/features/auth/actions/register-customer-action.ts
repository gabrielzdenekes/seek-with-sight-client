import { RegisterCustomerSchema, type RegisterCustomerState } from "../schemas/register-customer-schema";
import type { AuthContextType } from "../types";

export const registerCustomerAction = async (
    registerFn: AuthContextType["register"],
    _: RegisterCustomerState,
    formData: FormData
): Promise<RegisterCustomerState> => {
    const rawData = Object.fromEntries(formData.entries());

    const validated = RegisterCustomerSchema.safeParse(rawData);

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
    } catch {
        return {
            errors: {},
            message: "register.validation.failed",
            success: false,
        };
    }
};
