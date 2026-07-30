import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/navbar/Navbar";
import { Box, Container, Typography } from "@mui/material";

const MainLayout = () => {
    return (
        <>
            <Navbar />

            {/* Main Content Window */}
            <Container
                component="main"
                maxWidth="lg"
                sx={{ flexGrow: 1, py: 4 }}
            >
                <Outlet />
            </Container>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 3,
                    mt: "auto",
                    backgroundColor: (theme) => theme.palette.background.paper,
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" align="center">
                        &copy; {new Date().getFullYear()} ShopBack E-Commerce. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default MainLayout;
