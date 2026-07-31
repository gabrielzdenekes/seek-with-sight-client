import { Box, Typography, Link } from "@mui/material";
import { useAuth } from "@/features/auth/context/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginSchema } from "@/features/auth/schemas/login-schema";
import AuthForm from "@/pages/auth/auth-fortm/AuthForm";
import type { FieldConfig } from "@/components/ui/form/field.types";

const LOGIN_FIELDS: FieldConfig[] = [
    { name: "email", labelKey: "common.fields.email", type: "email", autoComplete: "email" },
    { name: "password", labelKey: "common.fields.password", type: "password", autoComplete: "current-password" },
] as const;

export default function LoginPage() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();

    const formFooter = (
        <Box sx={{ mt: 1, mb: 3, display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
                {t("login.noAccountPrompt")}
            </Typography>
            <Link component={RouterLink} to="/register/customer" underline="hover">
                {t("login.createAccountLink")}
            </Link>
        </Box>
    );

    return (
        <AuthForm
            titleKey="login.title"
            subtitleKey="login.subtitle"
            fields={LOGIN_FIELDS}
            schema={LoginSchema}
            action={login}
            submitLabelKey="login.submit"
            onSuccess={() => navigate("/")}
            formFooter={formFooter}
            showSocial={true}
            socialPromptKey="login.socialPrompt"
        />
    );
}
