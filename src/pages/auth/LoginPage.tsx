import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Link
} from "@mui/material";
import { useAuth } from "@/features/auth/context/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    authContainerSx,
    authCardSx,
    roundedInputSx,
} from "./styles";
import SocialProviders from "@/features/auth/components/social-providers/SocialProviders";
import GenericForm from "@/components/ui/form/GenericForm";
import { LoginSchema } from "@/features/auth/schemas/login-schema";

const LOGIN_FIELDS = [
    { name: "email", labelKey: "common.fields.email", type: "email", autoComplete: "email" },
    { name: "password", labelKey: "common.fields.password", type: "password", autoComplete: "current-password" },
] as const;

export default function LoginPage() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();

    function onLoginSuccess() {
        navigate("/");
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
                    <Typography variant="h4" sx={{ color: "text.secondary", fontWeight: 300, mb: 3 }}>
                        {t("login.title")}
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>
                        {t("login.subtitle")}
                    </Typography>

                    <GenericForm
                        fields={LOGIN_FIELDS}
                        schema={LoginSchema}
                        onFormSuccess={onLoginSuccess}
                        action={login}
                        submitLabelKey="login.submit"
                        inputSx={roundedInputSx}
                    >
                        <Box sx={{ mt: 1, mb: 3, display: "flex", flexDirection: "column", gap: 0.5 }}>
                            <Typography variant="body2" sx={{ color: "text.primary" }}>
                                {t("login.noAccountPrompt")}
                            </Typography>
                            <Link component={RouterLink} to="/register/customer" underline="hover">
                                {t("login.createAccountLink")}
                            </Link>
                        </Box>
                    </GenericForm>

                    <Divider sx={{ my: 2, color: "text.secondary" }}>{t("common.or")}</Divider>

                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                        {t("login.socialPrompt")}
                    </Typography>

                    <SocialProviders />
                </CardContent>
            </Card>
        </Box>
    );
}
