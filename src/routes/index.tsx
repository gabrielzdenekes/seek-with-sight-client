import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ProductListPage from "@/pages/products/ProductListPage";
import ProductDetailsPage from "@/pages/products/ProductDetailPage";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterCustomerPage from "@/pages/auth/RegisterCustomerPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "products", element: <ProductListPage /> },
            { path: "products/:id", element: <ProductDetailsPage /> },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <LoginPage /> },
            {
                path: "register",
                children: [
                    {
                        path: "customer", element: <RegisterCustomerPage />
                    }
                ]
            },
        ],
    },
]);

export default router;
