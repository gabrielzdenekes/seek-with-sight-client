import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Divider,
    Link,
    Alert
} from "@mui/material";
import { useAuth } from "@/features/auth/context/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { type LoginState } from "@/features/auth/schemas/login-schema";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/features/auth/actions/login-action";
import { useTranslation } from "react-i18next";
import {
    authContainerSx,
    authCardSx,
    roundedInputSx,
} from "./styles";
import SocialProviders from "@/features/auth/components/social-providers/SocialProviders";

const initialState: LoginState = {
    errors: {},
    message: null,
    success: false,
};

const LOGIN_FIELDS = [
    { name: "email", labelKey: "common.fields.email", type: "email", autoComplete: "email" },
    { name: "password", labelKey: "common.fields.password", type: "password", autoComplete: "current-password" },
] as const;

export default function LoginPage() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [state, formAction] = useActionState(
        loginAction.bind(null, login),
        initialState
    );

    const onSocialProviderSuccess = (providerName: string, data: any) => {
        console.log(providerName);
        console.log(data);
    };

    const onSocialProviderFailure = (providerName: string, error: unknown) => {
        console.log(providerName);
        console.log(error);
    };

    useEffect(() => {
        if (state.success) {
            navigate("/");
        }
    }, [state.success, navigate]);

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
                    <Typography variant="h4" sx={{ color: "text.secondary", fontWeight: 300, mb: 3 }}>
                        {t("login.title")}
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>
                        {t("login.subtitle")}
                    </Typography>

                    {state.message && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                            {t(state.message)}
                        </Alert>
                    )}

                    <Box component="form" action={formAction} noValidate>
                        {LOGIN_FIELDS.map((field) => {
                            const fieldError = state.errors?.[field.name as keyof typeof state.errors]?.[0];

                            return (
                                <TextField
                                    key={field.name}
                                    id={`login-${field.name}`}
                                    name={field.name}
                                    type={field.type}
                                    label={t(field.labelKey)}
                                    autoComplete={field.autoComplete}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    error={!!fieldError}
                                    helperText={fieldError ? t(fieldError) : null}
                                    sx={roundedInputSx}
                                />
                            );
                        })}

                        <SubmitButton label={t("login.submit")} />
                    </Box>

                    <Box sx={{ mt: 2, mb: 3, px: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                            {t("login.noAccountPrompt")}
                        </Typography>
                        <Link
                            component={RouterLink}
                            to="/register/customer"
                            underline="hover"
                            sx={{ color: "primary.main", fontWeight: 500 }}
                        >
                            {t("login.createAccountLink")}
                        </Link>
                    </Box>

                    <Divider sx={{ mb: 1, color: "text.secondary" }}>
                        {t("common.or")}
                    </Divider>

                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                        {t("login.socialPrompt")}
                    </Typography>

                    <SocialProviders
                        onSuccess={(provName, data) => onSocialProviderSuccess(provName, data)}
                        onFailure={(provName, error) => onSocialProviderFailure(provName, error)}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}
