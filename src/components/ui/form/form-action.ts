import type { FormState } from "@/components/ui/form/form.types";
import type { ZodObject } from "zod";

export async function onSubmitAction(
    action: <TFormData>(data: TFormData) => Promise<void>,
    schema: ZodObject,
    _: FormState,
    formData: FormData
): Promise<FormState> {

    const rawData = Object.fromEntries(formData.entries());
    const validated = schema.safeParse(rawData);

    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
            message: null,
            success: false
        };
    }

    try {
        await action(validated.data);

        return { success: true };
    } catch (e) {
        console.log(e);

        return {
            errors: {},
            message: "login.validation.failed",
            success: false,
        };
    }
}
