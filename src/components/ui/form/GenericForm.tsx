import type { GenericFormProps } from "@/components/ui/form/form.types";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Alert, Box, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function GenericForm({
    fields,
    state,
    action,
    submitLabelKey,
    containerSx,
    inputSx,
    children
}: GenericFormProps) {

    const { t } = useTranslation();

    return (
        <Box component="form" action={action} noValidate sx={containerSx}>
            {state.message && (
                <Alert
                    severity={state.success ? "success" : "error"}
                    sx={{ mb: 2, borderRadius: 2 }}
                >
                    {t(state.message)}
                </Alert>
            )}

            {fields.map((field) => {
                const fieldErrors = state.errors?.[field.name];
                const fieldError = fieldErrors && fieldErrors.length > 0 ? fieldErrors[0] : undefined;

                return (
                    <TextField
                        key={field.name}
                        id={`${field.name}-input`}
                        name={field.name}
                        type={field.type || "text"}
                        label={t(field.labelKey)}
                        autoComplete={field.autoComplete}
                        fullWidth
                        variant="outlined"
                        size="small"
                        error={!!fieldError}
                        helperText={fieldError ? t(fieldError) : null}
                        sx={[
                            { mb: 2.5 },
                            ...(Array.isArray(inputSx) ? inputSx : [inputSx]),
                            ...(Array.isArray(field.sx) ? field.sx : [field.sx]),
                        ]}
                    />
                );
            })}

            {children}

            <SubmitButton label={t(submitLabelKey)} />
        </Box>
    );
}
