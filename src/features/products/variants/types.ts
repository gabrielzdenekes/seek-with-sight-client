import type { ProductImage } from "@/features/products/types";

export interface ProductVariantRequest {
    title: string;
    sku: string;
    price: number;
    quantity: number;
}

export interface ProductVariantResponse {
    id: string;
    title: string;
    sku: string;
    images: ProductImage[];
    salePrice?: number;
    saleStartDate?: string;
    saleEndDate?: string;
}
