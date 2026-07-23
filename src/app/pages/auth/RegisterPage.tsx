import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Divider,
    Link,
    Alert,
    CircularProgress
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "@/features/auth/context/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        setIsSubmitting(true);

        try {
            // Call the register function from AuthContext
            await register({
                email: formData.email,
                password: formData.password,
            });

            // Redirect to login page on success
            navigate("/login");
        } catch (err: any) {
            // Display backend error message if available
            setError(err?.message || "Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f4f4f4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
            }}
        >
            {/* Logo */}
            <Box sx={{ mb: 0, height: 120 }}>
                <img
                    src="/src/assets/logo.png"
                    alt="SwS Logo"
                    style={{ width: "420px", objectFit: "contain" }}
                />
            </Box>

            {/* Main Register Card */}
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    mb: 2,
                }}
            >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        sx={{ color: "#888", fontWeight: 300, mb: 3 }}
                    >
                        Create Account
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#222", mb: 3 }}
                    >
                        Please fill in the details below to sign up.
                    </Typography>

                    {/* Display error alert if any error exists */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }}>
                            {error}
                        </Alert>
                    )}

                    {/* Wrap inputs inside a form element */}
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "50px",
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="password"
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "50px",
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "50px",
                                },
                            }}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disableElevation
                            disabled={isSubmitting}
                            sx={{
                                backgroundColor: "#333",
                                color: "#fff",
                                textTransform: "none",
                                borderRadius: "50px",
                                py: 1,
                                mb: 3,
                                fontSize: "16px",
                                "&:hover": {
                                    backgroundColor: "#aaa",
                                },
                            }}
                        >
                            {isSubmitting ? (
                                <CircularProgress size={24} sx={{ color: "#fff" }} />
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </Box>

                    <Typography variant="body2" sx={{ color: "#333", fontSize: "13px", mb: 4, px: 2 }}>
                        Already have an account? <br />
                        <Link href="/login" underline="none" sx={{ color: "#007ced", fontSize: "14px", fontWeight: 500 }}>
                            Log in here
                        </Link>
                    </Typography>

                    <Divider sx={{ mb: 1, color: "#aaa", fontSize: "14px" }}>
                        or
                    </Divider>

                    <Typography variant="body2" sx={{ color: "#999", fontSize: "13px", mb: 3 }}>
                        sign up with your social account
                    </Typography>

                    {/* Social Buttons */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            disableElevation
                            startIcon={<FacebookIcon sx={{ position: "absolute", left: 16 }} />}
                            sx={{
                                backgroundColor: "#405a93",
                                color: "#fff",
                                textTransform: "none",
                                borderRadius: "50px",
                                py: 1,
                                position: "relative",
                                justifyContent: "center",
                                "&:hover": { backgroundColor: "#324a7a" },
                            }}
                        >
                            Facebook
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            disableElevation
                            startIcon={<GoogleIcon sx={{ position: "absolute", left: 16 }} />}
                            sx={{
                                backgroundColor: "#cb523e",
                                color: "#fff",
                                textTransform: "none",
                                borderRadius: "50px",
                                py: 1,
                                position: "relative",
                                justifyContent: "center",
                                "&:hover": { backgroundColor: "#b34533" },
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
