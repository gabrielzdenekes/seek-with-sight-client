import ProductSkeleton from "@/features/products/product-skeleton/ProductSkeleton";
import LandingProducts from "@/features/products/landing/LandingProducts";
import type { LandingProductsData } from "@/features/products/landing/types";
import { get } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import { Container, Stack, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

async function fetchLandingProducts(): Promise<LandingProductsData> {
    const response = await get<ApiResponse<LandingProductsData>>("/products/landing");

    if (!response.success || !response.data) {
        throw new Error("products.loadFailed");
    }

    return response.data;
}

export default function LandingProductsContainer() {
    const { t } = useTranslation();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["landingProducts"],
        queryFn: fetchLandingProducts
    });

    if (isLoading) {
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

    if (isError) {
        return (
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Alert severity="error">{ t(error.message) }</Alert>
            </Container>
        );
    }

    return <LandingProducts data={data} />;
}
