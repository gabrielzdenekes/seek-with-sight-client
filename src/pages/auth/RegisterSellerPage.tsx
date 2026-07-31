import {
    Box,
    Typography,
    Link} from "@mui/material";
import { useAuth } from "@/features/auth/context/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RegisterSellerSchema } from "@/features/auth/schemas/register-seller-schema";
import type { FieldConfig } from "@/components/ui/form/field.types";
import AuthForm from "@/pages/auth/auth-fortm/AuthForm";

const REGISTER_FIELDS: FieldConfig[] = [
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

    const formFooter = (
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
    );

    return (
        <AuthForm
            titleKey="register.seller.title"
            subtitleKey="register.seller.subtitle"
            fields={REGISTER_FIELDS}
            schema={RegisterSellerSchema}
            action={registerSeller}
            submitLabelKey="register.submit"
            successOptions={{
                titleKey: "register.successTitle",
                messageKey: "register.seller.verifyEmailMessage",
                buttonTextKey: "register.seller.goToLogin",
                buttonLink: "/login"
            }}
            formFooter={formFooter}
            showSocial={false}
        />
    );
}
