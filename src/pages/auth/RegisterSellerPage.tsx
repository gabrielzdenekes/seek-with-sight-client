import {
    Box,
    Card,
    CardContent,
    Typography,
    Link,
    Alert,
    Button
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useAuth } from "@/features/auth/context/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    authContainerSx,
    authCardSx,
    roundedInputSx
} from "./styles";
import GenericForm from "@/components/ui/form/GenericForm";
import { RegisterSellerSchema } from "@/features/auth/schemas/register-seller-schema";

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
                    mb: 2
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

                            <GenericForm
                                fields={REGISTER_FIELDS}
                                action={registerSeller}
                                onFormSuccess={onRegisterSuccess}
                                schema={RegisterSellerSchema}
                                submitLabelKey="register.submit"
                                inputSx={roundedInputSx}>

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
                            </GenericForm>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
