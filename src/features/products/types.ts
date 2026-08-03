import type { Brand } from "@/features/brands/types";
import type { Category } from "@/features/categories/types";

export interface ProductVariant {
    id: string;
}

export interface ProductImage {
    id: string;

    url: string;
}

export interface Product {
    id: string;

    name: string;

    slug: string;

    shortDescription: string;

    description: string;

    status: "DRAFT" | "ACTIVE" | "ARCHIVED" | "OUT_OF_STOCK";

    averageRating: number;

    reviewCount: number;

    brand: Brand;

    category: Category;

    variants: ProductVariant[];

    images: ProductImage[];
}
