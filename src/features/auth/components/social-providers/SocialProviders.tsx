import { Box, Button } from "@mui/material";
import { baseSocialButtonSx, SOCIAL_COLORS, socialIconSx } from "@/features/auth/components/social-providers/styles";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../../context/useAuth";
import { useTranslation } from "react-i18next";

const SOCIAL_PROVIDERS = [
    {
        key: "google",
        labelKey: "common.social.google",
        Icon: GoogleIcon,
        color: SOCIAL_COLORS.google,
    }
] as const;

interface SocialProviderProps {
    onSuccess?: (providerName: ProviderKey, data: any) => void;

    onFailure?: (providerName: string, error: unknown) => void;
}

type ProviderKey = typeof SOCIAL_PROVIDERS[number]["key"];

export default function SocialProviders(props: SocialProviderProps) {
    const { registerWithProvider } = useAuth();
    const { t } = useTranslation();

    const onProviderClick = async (providerName: ProviderKey) => {
        try {
            const loginAction = registerWithProvider.get(providerName);

            const data = await loginAction();

            if (props.onSuccess) {
                props.onSuccess(providerName, data);
            }
        } catch (e) {
            if (props.onFailure) {
                props.onFailure(providerName, e);
            }
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {SOCIAL_PROVIDERS.map(({ key, labelKey, Icon, color }) => (
                <Button
                    key={key}
                    onClick={() => onProviderClick(key)}
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
    );
}
