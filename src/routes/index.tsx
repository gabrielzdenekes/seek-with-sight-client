import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ProductListPage from "@/pages/products/ProductListPage";
import ProductDetailsPage from "@/pages/products/ProductDetailPage";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterCustomerPage from "@/pages/auth/RegisterCustomerPage";
import RegisterSellerPage from "@/pages/auth/RegisterSellerPage";
import { ProtectedRoute } from "@/features/auth/guards/ProtectedRoute";

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
                    },
                    {
                        path: "seller", element: <RegisterSellerPage />
                    }
                ]
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/protected",
                element: <h1>PROTECTED</h1>
            }
        ]
    }
]);

export default router;
