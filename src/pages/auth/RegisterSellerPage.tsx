import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Link,
    Alert,
    Button
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useAuth } from "@/features/auth/context/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { type RegisterSellerState } from "@/features/auth/schemas/register-seller-schema";
import { useActionState } from "react";
import { registerSellerAction } from "@/features/auth/actions/register-seller-action";
import { useTranslation } from "react-i18next";
import {
    authContainerSx,
    authCardSx,
    roundedInputSx
} from "./styles";

const initialState: RegisterSellerState = {
    errors: {},
    message: null,
    success: false,
};

const REGISTER_FIELDS = [
    { name: "businessName", labelKey: "common.fields.businessName", type: "text", autoComplete: "organization" },
    { name: "businessAddress", labelKey: "common.fields.businessAddress", type: "text", autoComplete: "street-address" },
    { name: "taxId", labelKey: "common.fields.taxId", type: "text", autoComplete: "off" },
    { name: "email", labelKey: "common.fields.email", type: "email", autoComplete: "email" },
    { name: "password", labelKey: "common.fields.password", type: "password", autoComplete: "new-password" },
    { name: "confirmPassword", labelKey: "common.fields.confirmPassword", type: "password", autoComplete: "new-password" },
] as const;

export default function RegisterSellerPage() {
    const { t } = useTranslation();
    const { registerSeller } = useAuth();

    const [state, formAction] = useActionState(
        registerSellerAction.bind(null, registerSeller),
        initialState
    );

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
                    mb: 2
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
                                {t("register.seller.verifyEmailMessage")}
                            </Alert>

                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="contained"
                                fullWidth
                                disableElevation
                                sx={{ py: 1.2, borderRadius: 2 }}
                            >
                                {t("register.seller.goToLogin")}
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h4" sx={{ color: "text.secondary", fontWeight: 300, mb: 3 }}>
                                {t("register.seller.title")}
                            </Typography>

                            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}>
                                {t("register.seller.subtitle")}
                            </Typography>

                            {state.message && (
                                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                                    {t(state.message)}
                                </Alert>
                            )}

                            <Box component="form" action={formAction} noValidate>
                                {REGISTER_FIELDS.map((field, index) => {
                                    const fieldError = state.errors?.[field.name as keyof typeof state.errors]?.[0];
                                    const isLast = index === REGISTER_FIELDS.length - 1;

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
                                            sx={isLast ? { ...roundedInputSx, mb: 3 } : roundedInputSx}
                                        />
                                    );
                                })}

                                <SubmitButton label={t("register.submit")} />
                            </Box>

                            <Box sx={{ mt: 2, px: 2, display: "flex", flexDirection: "column", gap: 1 }}>
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
                                    {t("register.seller.customerPrompt")}{" "}
                                    <Link
                                        component={RouterLink}
                                        to="/register/customer"
                                        underline="hover"
                                        sx={{ color: "primary.main", fontWeight: 500 }}
                                    >
                                        {t("register.seller.customerLink")}
                                    </Link>
                                </Typography>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
