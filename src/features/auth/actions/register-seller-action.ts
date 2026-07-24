import type { AuthContextType } from "@/features/auth/types";
import { RegisterSellerSchema, type RegisterSellerState } from "@/features/auth/schemas/register-seller-schema";

export const registerSellerAction = async (
    registerFn: AuthContextType["registerSeller"],
    _: RegisterSellerState,
    formData: FormData
): Promise<RegisterSellerState> => {
    const rawData = Object.fromEntries(formData.entries());

    const validated = RegisterSellerSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
            message: null,
            success: false,
        };
    }

    try {
        await registerFn({
            ...validated.data
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
