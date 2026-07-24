import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Divider,
    Link,
    Alert
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useAuth } from "@/features/auth/context/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { type RegisterCustomerState } from "@/features/auth/schemas/register-customer-schema";
import { useActionState } from "react";
import { registerCustomerAction } from "@/features/auth/actions/register-customer-action";
import { useTranslation } from "react-i18next";
import {
    SOCIAL_COLORS,
    authContainerSx,
    authCardSx,
    roundedInputSx,
    baseSocialButtonSx,
    socialIconSx
} from "./styles";

const initialState: RegisterCustomerState = {
    errors: {},
    message: null,
    success: false,
};

const REGISTER_FIELD_ROWS = [
    [
        { name: "firstName", labelKey: "common.fields.firstName", type: "text", autoComplete: "given-name" },
        { name: "lastName", labelKey: "common.fields.lastName", type: "text", autoComplete: "family-name" },
    ],
    [
        { name: "phone", labelKey: "common.fields.phone", type: "tel", autoComplete: "tel" },
    ],
    [
        { name: "email", labelKey: "common.fields.email", type: "email", autoComplete: "email" },
    ],
    [
        { name: "password", labelKey: "common.fields.password", type: "password", autoComplete: "new-password" },
    ],
    [
        { name: "confirmPassword", labelKey: "common.fields.confirmPassword", type: "password", autoComplete: "new-password" },
    ],
] as const;

const SOCIAL_PROVIDERS = [
    {
        key: "facebook",
        labelKey: "common.social.facebook",
        Icon: FacebookIcon,
        color: SOCIAL_COLORS.facebook,
    },
    {
        key: "google",
        labelKey: "common.social.google",
        Icon: GoogleIcon,
        color: SOCIAL_COLORS.google,
    },
] as const;

export default function RegisterCustomerPage() {
    const { t } = useTranslation();
    const { registerCustomer } = useAuth();

    const [state, formAction] = useActionState(
        registerCustomerAction.bind(null, registerCustomer),
        initialState
    );

    return (
        <Box sx={authContainerSx}>
            {/* Responsive Logo Container */}
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
                    {state.success ? (
                        <Box sx={{ py: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />

                            <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 500, mb: 2 }}>
                                {t("register.successTitle")}
                            </Typography>

                            <Alert severity="success" sx={{ mb: 4, borderRadius: 2, textAlign: "left" }}>
                                {t("register.customer.verifyEmailMessage")}
                            </Alert>

                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="contained"
                                fullWidth
                                disableElevation
                                sx={{ py: 1.2, borderRadius: 2 }}
                            >
                                {t("register.customer.goToLogin")}
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h4" sx={{ color: "text.secondary", fontWeight: 300, mb: 3 }}>
                                {t("register.customer.title")}
                            </Typography>

                            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}>
                                {t("register.subtitle")}
                            </Typography>

                            {state.message && (
                                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                                    {t(state.message)}
                                </Alert>
                            )}

                            <Box component="form" action={formAction} noValidate>
                                {REGISTER_FIELD_ROWS.map((row, rowIndex) => {
                                    const isLastRow = rowIndex === REGISTER_FIELD_ROWS.length - 1;

                                    return (
                                        <Box
                                            key={rowIndex}
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                ...(isLastRow ? { mb: 3 } : {}),
                                            }}
                                        >
                                            {row.map((field) => {
                                                const fieldError = state.errors?.[field.name as keyof typeof state.errors]?.[0];

                                                return (
                                                    <TextField
                                                        key={field.name}
                                                        id={`register-${field.name}`}
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
                                        </Box>
                                    );
                                })}

                                <SubmitButton label={t("register.submit")} />
                            </Box>

                            <Box sx={{ mt: 2, mb: 3, px: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography variant="body2" sx={{ color: "text.primary" }}>
                                    {t("register.hasAccountPrompt")}{" "}
                                    <Link
                                        component={RouterLink}
                                        to="/login"
                                        underline="hover"
                                        sx={{ color: "primary.main", fontWeight: 500 }}
                                    >
                                        {t("register.loginLink")}
                                    </Link>
                                </Typography>

                                <Typography variant="body2" sx={{ color: "text.primary" }}>
                                    {t("register.customer.sellerPrompt")}{" "}
                                    <Link
                                        component={RouterLink}
                                        to="/register/seller"
                                        underline="hover"
                                        sx={{ color: "primary.main", fontWeight: 500 }}
                                    >
                                        {t("register.customer.sellerLink")}
                                    </Link>
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 1, color: "text.secondary" }}>
                                {t("common.or")}
                            </Divider>

                            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                                {t("register.socialPrompt")}
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                {SOCIAL_PROVIDERS.map(({ key, labelKey, Icon, color }) => (
                                    <Button
                                        key={key}
                                        fullWidth
                                        variant="contained"
                                        disableElevation
                                        startIcon={<Icon sx={socialIconSx} />}
                                        sx={{
                                            ...baseSocialButtonSx,
                                            backgroundColor: color.main,
                                            "&:hover": { backgroundColor: color.hover },
                                        }}
                                    >
                                        {t(labelKey)}
                                    </Button>
                                ))}
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
