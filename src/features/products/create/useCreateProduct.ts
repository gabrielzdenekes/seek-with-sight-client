import type { ProductFormValues } from "@/features/products/create/createProductSchema";
import type { Product } from "@/features/products/types";
import { post } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";

async function uploadImages(product: Product, images: File[]) {
    for (const img of images) {
        const formData = new FormData();

        formData.append("file", img);

        product = await post(`/products/${product.id}/images`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    return product;
}

export function useCreateProduct() {
    return useMutation({
        mutationFn: async ({ productData, images }: { productData: ProductFormValues, images: File[] }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { images: _, ...payload } = productData;
            const productResponse = await post<ApiResponse<Product>>("/products", payload);
            let product = productResponse.data;

            if (images && images.length > 0) {
                product = await uploadImages(product, images);
            }

            return product;
        }
    });
}
