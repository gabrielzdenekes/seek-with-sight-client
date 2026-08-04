import type { ProductFormValues } from "@/features/products/create/createProductSchema";
import type { Product } from "@/features/products/types";
import type { ProductVariantRequest, ProductVariantResponse } from "@/features/products/variants/types";
import { post } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";

export interface CreateProductVariantInput {
    title: string;
    sku: string;
    price: number;
    quantity: number;
    images: File[];
}

async function uploadImages(product: Product, images: File[]) {
    for (const img of images) {
        const formData = new FormData();
        formData.append("file", img);

        product = (await post<ApiResponse<Product>>(`/products/${product.id}/images`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })).data;
    }

    return product;
}

async function createVariant(productId: string, variantData: ProductVariantRequest) {
    const response = await post<ApiResponse<ProductVariantResponse>>(
        `/products/${productId}/variants`,
        variantData
    );
    return response.data;
}

async function uploadVariantImages(productId: string, variantId: string, images: File[]) {
    for (const img of images) {
        const formData = new FormData();
        formData.append("file", img);

        await post<ApiResponse<ProductVariantResponse>>(
            `/products/${productId}/variants/${variantId}/images`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
    }
}

export function useCreateProduct() {
    return useMutation({
        mutationFn: async ({
            productData,
            images,
            variants
        }: {
            productData: ProductFormValues;
            images: File[];
            variants?: CreateProductVariantInput[];
        }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { images: _, ...payload } = productData;
            const productResponse = await post<ApiResponse<Product>>("/products", payload);
            let product = productResponse.data;

            if (images && images.length > 0) {
                product = await uploadImages(product, images);
            }

            if (variants && variants.length > 0) {
                for (const variantInput of variants) {
                    const { images: variantFiles, ...variantPayload } = variantInput;
                    const variantResponse = await createVariant(product.id, variantPayload);

                    if (variantFiles && variantFiles.length > 0) {
                        await uploadVariantImages(product.id, variantResponse.id, variantFiles);
                    }
                }
            }

            return product;
        }
    });
}
