export interface ProductCardDisplayData {
    id: string;
    name: string;
    price: number;
    salePrice?: number | null;
    imageUrl?: string | null;
    discountPercentage?: number;
    rating?: number;
    reviewCount?: number;
    totalSold?: number;
    variantTitle?: string;
}
