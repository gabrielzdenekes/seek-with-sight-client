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

export default function RegisterCustomerPage() {
    const { t } = useTranslation();
    const { registerCustomer } = useAuth();

    const [state, formAction] = useActionState(
        registerCustomerAction.bind(null, registerCustomer),
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
                                {t("register.customer.verifyEmailMessage")}
                            </Alert>

                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="contained"
                                fullWidth
                                disableElevation
                                sx={{ py: 1.2, borderRadius: "8px" }}
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
                                <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>
                                    {t(state.message)}
                                </Alert>
                            )}

                            <Box component="form" action={formAction} noValidate>
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        label={t("common.fields.firstName")}
                                        name="firstName"
                                        error={!!state.errors?.firstName}
                                        helperText={state.errors?.firstName?.[0] ? t(state.errors?.firstName?.[0]) : null}
                                        sx={roundedInputSx}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        label={t("common.fields.lastName")}
                                        name="lastName"
                                        error={!!state.errors?.lastName}
                                        helperText={state.errors?.lastName?.[0] ? t(state.errors?.lastName?.[0]) : null}
                                        sx={roundedInputSx}
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    label={t("common.fields.phone")}
                                    name="phone"
                                    error={!!state.errors?.phone}
                                    helperText={state.errors?.phone?.[0] ? t(state.errors?.phone?.[0]) : null}
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

                            <Typography variant="body2" sx={{ color: "text.primary", fontSize: "13px", mb: 4, px: 2 }}>
                                {t("register.customer.sellerPrompt")}{" "}
                                <Link component={RouterLink} to="/register/seller" underline="none" sx={{ color: "primary.main", fontSize: "14px", fontWeight: 500 }}>
                                    {t("register.customer.sellerLink")}
                                </Link>
                            </Typography>

                            <Divider sx={{ mb: 1, color: "text.secondary", fontSize: "14px" }}>
                                {t("common.or")}
                            </Divider>

                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "13px", mb: 3 }}>
                                {t("register.socialPrompt")}
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    disableElevation
                                    startIcon={<FacebookIcon sx={socialIconSx} />}
                                    sx={{
                                        ...baseSocialButtonSx,
                                        backgroundColor: SOCIAL_COLORS.facebook.main,
                                        "&:hover": { backgroundColor: SOCIAL_COLORS.facebook.hover },
                                    }}
                                >
                                    {t("common.social.facebook")}
                                </Button>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    disableElevation
                                    startIcon={<GoogleIcon sx={socialIconSx} />}
                                    sx={{
                                        ...baseSocialButtonSx,
                                        backgroundColor: SOCIAL_COLORS.google.main,
                                        "&:hover": { backgroundColor: SOCIAL_COLORS.google.hover },
                                    }}
                                >
                                    {t("common.social.google")}
                                </Button>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
