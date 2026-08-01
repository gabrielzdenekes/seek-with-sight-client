import ProductSkeleton from "@/features/products/landing/ProductSkeleton";
import ProductsLanding from "@/features/products/landing/ProductsLanding";
import type { LandingProductsData } from "@/features/products/landing/types";
import { get } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import { Container, Stack, Alert } from "@mui/material";
import { useState, useEffect } from "react";

export default function MainViewContainer() {
    const [data, setData] = useState<LandingProductsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                        setError(response.message || "Failed to load products");
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "An unexpected error occurred");
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
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!data) {
        return null;
    }

    return <ProductsLanding data={data} />;
}
