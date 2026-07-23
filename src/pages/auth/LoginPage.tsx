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
import { useAuth } from "@/features/auth/context/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { type LoginState } from "@/features/auth/schemas/login-schema";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/features/auth/actions/login-action";
import {
    SOCIAL_COLORS,
    authContainerSx,
    authCardSx,
    roundedInputSx,
    baseSocialButtonSx,
    socialIconSx
} from "./styles";

const initialState: LoginState = {
    errors: {},
    message: null,
    success: false,
};

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [state, formAction] = useActionState(
        loginAction.bind(null, login),
        initialState
    );

    useEffect(() => {
        if (state.success) {
            navigate("/");
        }
    }, [state.success, navigate]);

    return (
        <Box sx={authContainerSx}>
            <Box sx={{ mb: 0, height: 120 }}>
                <img
                    src="/logo.png"
                    alt="SwS Logo"
                    style={{ width: "420px", objectFit: "contain" }}
                />
            </Box>

            <Card sx={authCardSx}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h4" sx={{ color: "text.secondary", fontWeight: 300, mb: 3 }}>
                        Hello!
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>
                        Please enter your email address and password.
                    </Typography>

                    {state.message && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>
                            {state.message}
                        </Alert>
                    )}

                    <Box component="form" action={formAction} noValidate>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Email"
                            name="email"
                            error={!!state.errors?.email}
                            helperText={state.errors?.email?.[0]}
                            sx={roundedInputSx}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="password"
                            label="Password"
                            name="password"
                            error={!!state.errors?.password}
                            helperText={state.errors?.password?.[0]}
                            sx={roundedInputSx}
                        />

                        <SubmitButton label="Login" />
                    </Box>

                    <Typography variant="body2" sx={{ color: "text.primary", fontSize: "13px", mb: 4, px: 2 }}>
                        Don't have an account? Don't worry!<br />
                        <Link component={RouterLink} to="/register" underline="none" sx={{ color: "primary.main", fontSize: "14px", fontWeight: 500 }}>
                            Create account
                        </Link>
                    </Typography>

                    <Divider sx={{ mb: 1, color: "text.secondary", fontSize: "14px" }}>
                        or
                    </Divider>

                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "13px", mb: 3 }}>
                        use your social account
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
                            Facebook
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
                            Google
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
