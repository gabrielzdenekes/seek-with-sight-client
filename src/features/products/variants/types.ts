export interface ProductVariantRequest {
    title: string;
    sku: string;
    price: number;
    quantity: number;
}

export interface ImageResponse {
    id: string;
    url: string;
}

export interface ProductVariantResponse {
    id: string;
    title: string;
    sku: string;
    images: ImageResponse[];
    salePrice?: number;
    saleStartDate?: string;
    saleEndDate?: string;
}
