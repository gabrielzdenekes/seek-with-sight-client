import type { ProductFormValues } from "@/features/products/create/createProductSchema";
import type { Product } from "@/features/products/types";
import { post } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";

async function uploadImages(productId: string, images: File[]) {
    for (const img of images) {
        const formData = new FormData();

        formData.append("images", img);

        await post(`/api/products/${productId}/images`, formData);
    }
}

export function useCreateProduct() {
    return useMutation({
        mutationFn: async ({ productData, images }: { productData: ProductFormValues, images: File[] }) => {
            const { images: _, ...payload } = productData;
            const productResponse = await post<ApiResponse<Product>>("/api/products", payload);
            const product = productResponse.data;

            if (images && images.length > 0) {
                await uploadImages(product.id, images);
            }

            return product;
        }
    });
}
