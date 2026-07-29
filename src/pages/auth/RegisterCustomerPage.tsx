import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    Link,
    Alert
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useAuth } from "@/features/auth/context/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { RegisterCustomerSchema } from "@/features/auth/schemas/register-customer-schema";
import { useTranslation } from "react-i18next";
import {
    authContainerSx,
    authCardSx,
    roundedInputSx
} from "./styles";
import SocialProviders from "@/features/auth/components/social-providers/SocialProviders";
import GenericForm from "@/components/ui/form/GenericForm";
import { useState } from "react";

const REGISTER_FIELD_ROWS = [
    { name: "firstName", labelKey: "common.fields.firstName", type: "text", autoComplete: "given-name" },
    { name: "lastName", labelKey: "common.fields.lastName", type: "text", autoComplete: "family-name" },
    { name: "phone", labelKey: "common.fields.phone", type: "tel", autoComplete: "tel" },
    { name: "email", labelKey: "common.fields.email", type: "email", autoComplete: "email" },
    { name: "password", labelKey: "common.fields.password", type: "password", autoComplete: "new-password" },
    { name: "confirmPassword", labelKey: "common.fields.confirmPassword", type: "password", autoComplete: "new-password" },
] as const;

export default function RegisterCustomerPage() {
    const { t } = useTranslation();
    const { registerCustomer } = useAuth();
    const [registerSuccess, setRegisterSuccess] = useState(false);

    function onRegisterSuccess() {
        setRegisterSuccess(true);
    }

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
                    {registerSuccess ? (
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

                            <GenericForm
                                fields={REGISTER_FIELD_ROWS}
                                schema={RegisterCustomerSchema}
                                action={registerCustomer}
                                submitLabelKey="register.submit"
                                inputSx={roundedInputSx}
                                onFormSuccess={onRegisterSuccess}>

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
                            </GenericForm>


                            <Divider sx={{ mb: 1, color: "text.secondary" }}>
                                {t("common.or")}
                            </Divider>

                            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                                {t("register.socialPrompt")}
                            </Typography>

                            <SocialProviders />
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
