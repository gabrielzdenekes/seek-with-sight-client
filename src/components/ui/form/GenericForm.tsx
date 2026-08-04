import { onSubmitAction } from "@/components/ui/form/on-submit-action";
import type { FormState, GenericFormProps } from "@/components/ui/form/form.types";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Alert, Box, Paper, Stack, TextField, Typography, MenuItem } from "@mui/material";
import { useActionState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const initialState: FormState = {
    errors: {},
    message: null,
    success: false,
};

export default function GenericForm({
    sections,
    action,
    schema,
    onFormSuccess,
    submitLabelKey,
    containerSx,
    inputSx,
    children
}: GenericFormProps) {
    const { t } = useTranslation();

    const [state, fa] = useActionState(
        onSubmitAction.bind(null, action, schema),
        initialState
    );

    useEffect(() => {
        if (state.success && onFormSuccess) {
            onFormSuccess();
        }
    }, [state, onFormSuccess]);

    return (
        <Box component="form" action={fa} noValidate sx={containerSx}>
            {state.message && (
                <Alert
                    severity={state.success ? "success" : "error"}
                    sx={{ mb: 3, borderRadius: 2 }}
                >
                    {t(state.message)}
                </Alert>
            )}

            {sections.map((section) => (
                <Paper
                    key={section.id}
                    sx={[{ p: 3, mb: 3 }, ...(Array.isArray(section.paperSx) ? section.paperSx : [section.paperSx || {}])]}
                >
                    {section.titleKey && (
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {t(section.titleKey)}
                        </Typography>
                    )}

                    {section.customRender && section.customRender(state)}

                    {section.fields && section.fields.length > 0 && (
                        <Stack spacing={2}>
                            {section.fields.map((field) => {
                                const fieldErrors = state.errors?.[field.name];
                                const fieldError = fieldErrors && fieldErrors.length > 0 ? fieldErrors[0] : undefined;

                                if (field.type === "custom" && field.customRender) {
                                    return (
                                        <Box key={field.name}>
                                            {field.customRender(fieldError)}
                                        </Box>
                                    );
                                }

                                return (
                                    <TextField
                                        key={field.name}
                                        id={`${field.name}-input`}
                                        name={field.name}
                                        type={field.type === "select" ? "text" : (field.type || "text")}
                                        select={field.type === "select"}
                                        label={t(field.labelKey)}
                                        defaultValue={field.defaultValue}
                                        autoComplete={field.autoComplete}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        error={!!fieldError}
                                        helperText={fieldError ? t(fieldError) : null}
                                        sx={[
                                            ...(Array.isArray(inputSx) ? inputSx : [inputSx || {}]),
                                            ...(Array.isArray(field.sx) ? field.sx : [field.sx || {}]),
                                        ]}
                                    >
                                        {field.type === "select" && field.options?.map((opt) => (
                                            <MenuItem key={opt.value} value={opt.value}>
                                                {t(opt.labelKey)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                );
                            })}
                        </Stack>
                    )}
                </Paper>
            ))}

            {children}

            <SubmitButton label={t(submitLabelKey)} />
        </Box>
    );
}
