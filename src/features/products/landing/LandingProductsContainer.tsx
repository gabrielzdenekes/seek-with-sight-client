import ProductSkeleton from "@/features/products/product-skeleton/ProductSkeleton";
import LandingProducts from "@/features/products/landing/LandingProducts";
import type { LandingProductsData } from "@/features/products/landing/types";
import { get } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import { Container, Stack, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LandingProductsContainer() {
    const [data, setData] = useState<LandingProductsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                setLoading(true);
                setError(null);

                const response = await get<ApiResponse<LandingProductsData>>("/products/landing");

                if (isMounted) {
                    if (response.success && response.data) {
                        setData(response.data);
                    } else {
                        setError("products.loadFailed");
                    }
                }
            } catch {
                if (isMounted) {
                    setError("products.loadFailed");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Stack spacing={8}>
                    <ProductSkeleton />
                    <ProductSkeleton />
                    <ProductSkeleton />
                    <ProductSkeleton />
                </Stack>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Alert severity="error">{ t(error) }</Alert>
            </Container>
        );
    }

    if (!data) {
        return null;
    }

    return <LandingProducts data={data} />;
}
