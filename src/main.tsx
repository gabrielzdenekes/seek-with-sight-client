import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { AuthInterceptor } from "@/features/auth/components/AuthInterceptor";

const theme = createTheme({
    palette: {
        mode: "light", // or 'dark'
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <AuthInterceptor>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </AuthInterceptor>
        </AuthProvider>
    </StrictMode>,
);
