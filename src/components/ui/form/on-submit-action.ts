import type { FormState } from "@/components/ui/form/form.types";
import { errorCodeMap } from "@/shared/error-code-map";
import { tryResolveApiErrorResponse } from "@/shared/http";
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
        const apiErrorResponse = tryResolveApiErrorResponse(e);

        if (apiErrorResponse) {
            const errorCode = apiErrorResponse.errorCode;

            return {
                errors: {},
                message: errorCodeMap[errorCode],
                success: false,
            };
        }

        return {
            errors: {},
            message: "common.error.somethingWentWrong",
            success: false,
        };
    }
}
