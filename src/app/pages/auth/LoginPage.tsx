import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Divider,
    Link
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
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
            <Box sx={{ mb: 2 }}>
                <img
                    src="/src/assets/logo.png"
                    alt="SwS Logo"
                    style={{ width: "420px", objectFit: "contain" }}
                />
            </Box>

            {/* Main Login Card */}
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
                        Hello!
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#222", mb: 2 }}
                    >
                        Please enter your email address and password.
                    </Typography>

                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Email"
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
                        sx={{
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "50px",
                            },
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        disableElevation
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
                        Login
                    </Button>

                    <Typography variant="body2" sx={{ color: "#333", fontSize: "13px", mb: 4, px: 2 }}>
                        Don't have an account? Don't worry!<br />
                        <Link href="/register" underline="none" sx={{ color: "#007ced", fontSize: "14px", fontWeight: 500 }}>
                            Create account
                        </Link>
                    </Typography>

                    <Divider sx={{ mb: 1, color: "#aaa", fontSize: "14px" }}>
                        or
                    </Divider>

                    <Typography variant="body2" sx={{ color: "#999", fontSize: "13px", mb: 3 }}>
                        use your social account
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

            {/* Help Link */}
            <Link href="#" underline="none" sx={{ color: "#007ced", fontSize: "14px", fontWeight: 500 }}>
                Do you need help?
            </Link>
        </Box>
    );
}
