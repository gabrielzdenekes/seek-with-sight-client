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
import { type RegisterState } from "@/features/auth/schemas/register-schema";
import { useActionState, useEffect } from "react";
import { registerAction } from "@/features/auth/actions/register-action";
import {
    SOCIAL_COLORS,
    authContainerSx,
    authCardSx,
    roundedInputSx,
    baseSocialButtonSx,
    socialIconSx
} from "@/pages/auth/styles";

const initialState: RegisterState = {
    errors: {},
    message: null,
    success: false,
};

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [state, formAction] = useActionState(
        registerAction.bind(null, register),
        initialState
    );

    useEffect(() => {
        if (state.success) {
            navigate("/login");
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
                        Create Account
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}>
                        Please fill in the details below to sign up.
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
                            type="email"
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

                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            error={!!state.errors?.confirmPassword}
                            helperText={state.errors?.confirmPassword?.[0]}
                            sx={{ ...roundedInputSx, mb: 3 }}
                        />

                        <SubmitButton label="Register" />
                    </Box>

                    <Typography variant="body2" sx={{ color: "text.primary", fontSize: "13px", mb: 4, px: 2 }}>
                        Already have an account? <br />
                        <Link component={RouterLink} to="/login" underline="none" sx={{ color: "primary.main", fontSize: "14px", fontWeight: 500 }}>
                            Log in here
                        </Link>
                    </Typography>

                    <Divider sx={{ mb: 1, color: "text.secondary", fontSize: "14px" }}>
                        or
                    </Divider>

                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "13px", mb: 3 }}>
                        sign up with your social account
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
