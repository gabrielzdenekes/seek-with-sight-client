import { Box, Typography, Link } from "@mui/material";
import { useAuth } from "@/features/auth/context/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { RegisterCustomerSchema } from "@/features/auth/schemas/register-customer-schema";
import { useTranslation } from "react-i18next";
import type { FormSectionDef } from "@/components/ui/form/form.types";
import AuthForm from "@/pages/auth/auth-fortm/AuthForm";

const REGISTER_CUSTOMER_SECTIONS: FormSectionDef[] = [
    {
        id: "register-customer",
        paperSx: { p: 0, mb: 0, boxShadow: "none", bgcolor: "transparent" },
        fields: [
            { name: "firstName", labelKey: "common.fields.firstName", type: "text", autoComplete: "given-name" },
            { name: "lastName", labelKey: "common.fields.lastName", type: "text", autoComplete: "family-name" },
            { name: "phone", labelKey: "common.fields.phone", type: "tel", autoComplete: "tel" },
            { name: "email", labelKey: "common.fields.email", type: "email", autoComplete: "email" },
            { name: "password", labelKey: "common.fields.password", type: "password", autoComplete: "new-password" },
            { name: "confirmPassword", labelKey: "common.fields.confirmPassword", type: "password", autoComplete: "new-password" },
        ],
    },
];

export default function RegisterCustomerPage() {
    const { t } = useTranslation();
    const { registerCustomer } = useAuth();

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
    );

    return (
        <AuthForm
            titleKey="register.customer.title"
            subtitleKey="register.subtitle"
            sections={REGISTER_CUSTOMER_SECTIONS}
            schema={RegisterCustomerSchema}
            action={registerCustomer}
            submitLabelKey="register.submit"
            successOptions={{
                titleKey: "register.successTitle",
                messageKey: "register.customer.verifyEmailMessage",
                buttonTextKey: "register.customer.goToLogin",
                buttonLink: "/login"
            }}
            formFooter={formFooter}
            showSocial={true}
            socialPromptKey="register.socialPrompt"
        />
    );
}
