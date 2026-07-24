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

export default function RegisterSellerPage() {
    const { t } = useTranslation();
    const { registerSeller } = useAuth();

    const [state, formAction] = useActionState(
        registerSellerAction.bind(null, registerSeller),
        initialState
    );

    return (
        <Box sx={authContainerSx}>
            <Box sx={{ mb: 0, height: 120 }}>
                <img
                    src="/logo.png"
                    alt={t("common.logoAlt")}
                    style={{ width: "420px", objectFit: "contain" }}
                />
            </Box>

            <Card sx={authCardSx}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                    {state.success ? (
                        <Box sx={{ py: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />

                            <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 500, mb: 2 }}>
                                {t("register.successTitle")}
                            </Typography>

                            <Alert severity="success" sx={{ mb: 4, borderRadius: "8px", textAlign: "left" }}>
                                {t("register.seller.verifyEmailMessage")}
                            </Alert>

                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="contained"
                                fullWidth
                                disableElevation
                                sx={{ py: 1.2, borderRadius: "8px" }}
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
                                <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>
                                    {t(state.message)}
                                </Alert>
                            )}

                            <Box component="form" action={formAction} noValidate>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    label={t("common.fields.businessName")}
                                    name="businessName"
                                    error={!!state.errors?.businessName}
                                    helperText={state.errors?.businessName?.[0] ? t(state.errors?.businessName?.[0]) : null}
                                    sx={roundedInputSx}
                                />

                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    label={t("common.fields.businessAddress")}
                                    name="businessAddress"
                                    error={!!state.errors?.businessAddress}
                                    helperText={state.errors?.businessAddress?.[0] ? t(state.errors?.businessAddress?.[0]) : null}
                                    sx={roundedInputSx}
                                />

                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    label={t("common.fields.taxId")}
                                    name="taxId"
                                    error={!!state.errors?.taxId}
                                    helperText={state.errors?.taxId?.[0] ? t(state.errors?.taxId?.[0]) : null}
                                    sx={roundedInputSx}
                                />

                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    label={t("common.fields.email")}
                                    name="email"
                                    type="email"
                                    error={!!state.errors?.email}
                                    helperText={state.errors?.email?.[0] ? t(state.errors?.email?.[0]) : null}
                                    sx={roundedInputSx}
                                />

                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    type="password"
                                    label={t("common.fields.password")}
                                    name="password"
                                    error={!!state.errors?.password}
                                    helperText={state.errors?.password?.[0] ? t(state.errors?.password?.[0]) : null}
                                    sx={roundedInputSx}
                                />

                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    type="password"
                                    label={t("common.fields.confirmPassword")}
                                    name="confirmPassword"
                                    error={!!state.errors?.confirmPassword}
                                    helperText={state.errors?.confirmPassword?.[0] ? t(state.errors?.confirmPassword?.[0]) : null}
                                    sx={{ ...roundedInputSx, mb: 3 }}
                                />

                                <SubmitButton label={t("register.submit")} />
                            </Box>

                            <Typography variant="body2" sx={{ color: "text.primary", fontSize: "13px", mb: 2, mt: 2, px: 2 }}>
                                {t("register.hasAccountPrompt")}{" "}
                                <Link component={RouterLink} to="/login" underline="none" sx={{ color: "primary.main", fontSize: "14px", fontWeight: 500 }}>
                                    {t("register.loginLink")}
                                </Link>
                            </Typography>

                            <Typography variant="body2" sx={{ color: "text.primary", fontSize: "13px", mb: 2, px: 2 }}>
                                {t("register.seller.customerPrompt")}{" "}
                                <Link component={RouterLink} to="/register/customer" underline="none" sx={{ color: "primary.main", fontSize: "14px", fontWeight: 500 }}>
                                    {t("register.seller.customerLink")}
                                </Link>
                            </Typography>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
