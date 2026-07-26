import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@/config/i18n";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { AuthInterceptor } from "@/features/auth/components/AuthInterceptor";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { appConfig } from "./config";

const theme = createTheme({
    palette: {
        mode: "light"
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={appConfig.authProviders.google.clientId}>
            <AuthProvider>
                <AuthInterceptor>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </AuthInterceptor>
            </AuthProvider>
        </GoogleOAuthProvider>
    </StrictMode>
);
