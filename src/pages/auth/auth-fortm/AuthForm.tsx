import { useState, type ReactNode } from "react";
import { Box, Card, CardContent, Typography, Divider, Button, Alert } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ZodObject } from "zod";

import GenericForm from "@/components/ui/form/GenericForm";
import type { FormSectionDef } from "@/components/ui/form/form.types";

import { authContainerSx, authCardSx, roundedInputSx } from "./styles";
import SocialProviders from "@/features/auth/components/social-providers/SocialProviders";

export interface AuthFormProps {
    titleKey: string;
    subtitleKey: string;
    sections: FormSectionDef[];
    schema: ZodObject<any, any>;
    action: (payload: any) => Promise<any>;
    submitLabelKey: string;
    onSuccess?: () => void;
    successOptions?: {
        titleKey: string;
        messageKey: string;
        buttonTextKey: string;
        buttonLink: string;
    };
    formFooter?: ReactNode;
    showSocial?: boolean;
    socialPromptKey?: string;
}

export default function AuthForm({
    titleKey,
    subtitleKey,
    sections,
    schema,
    action,
    submitLabelKey,
    onSuccess,
    successOptions,
    formFooter,
    showSocial = false,
    socialPromptKey
}: AuthFormProps) {
    const { t } = useTranslation();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSuccess = () => {
        if (successOptions) {
            setIsSuccess(true);
        }

        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <Box sx={authContainerSx}>
            <Box
                component="img"
                src="/logo.png"
                alt={t("common.logoAlt")}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    height: 120,
                    objectFit: "contain",
                    mb: 2,
                }}
            />

            <Card sx={authCardSx}>
                <CardContent sx={{ p: 4, "&:last-child": { pb: 4 }, textAlign: "center" }}>
                    {isSuccess && successOptions ? (
                        <Box sx={{ py: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <CheckCircleOutlinedIcon color="success" sx={{ fontSize: 64, mb: 2 }} />

                            <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 500, mb: 2 }}>
                                {t(successOptions.titleKey)}
                            </Typography>

                            <Alert severity="success" sx={{ mb: 4, borderRadius: 2, textAlign: "left", width: "100%" }}>
                                {t(successOptions.messageKey)}
                            </Alert>

                            <Button
                                component={RouterLink}
                                to={successOptions.buttonLink}
                                variant="contained"
                                fullWidth
                                disableElevation
                                sx={{ py: 1.2, borderRadius: 2 }}
                            >
                                {t(successOptions.buttonTextKey)}
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h4" sx={{ color: "text.secondary", fontWeight: 300, mb: 3 }}>
                                {t(titleKey)}
                            </Typography>

                            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}>
                                {t(subtitleKey)}
                            </Typography>

                            <GenericForm
                                sections={sections}
                                schema={schema}
                                action={action}
                                submitLabelKey={submitLabelKey}
                                inputSx={roundedInputSx}
                                onFormSuccess={handleSuccess}
                            >
                                {formFooter}
                            </GenericForm>

                            {showSocial && (
                                <>
                                    <Divider sx={{ my: 2, color: "text.secondary" }}>
                                        {t("common.or")}
                                    </Divider>

                                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                                        {t(socialPromptKey || "register.socialPrompt")}
                                    </Typography>

                                    <SocialProviders />
                                </>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
