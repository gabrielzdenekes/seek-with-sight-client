import { z } from "zod";

export const variantSchema = z.object({
    title: z
        .string()
        .min(2, "products.create.variants.errors.titleMin")
        .max(300, "products.create.variants.errors.titleMax"),
    sku: z
        .string()
        .regex(/^[A-Z0-9_-]+$/, "products.create.variants.errors.skuFormat"),
    price: z
        .number({ error: "products.create.variants.errors.priceInvalid" })
        .min(0, "products.create.variants.errors.priceMin"),
    quantity: z
        .number({ error: "products.create.variants.errors.quantityInvalid" })
        .int("products.create.variants.errors.quantityInt")
        .min(1, "products.create.variants.errors.quantityMin")
});

export type VariantFormValues = z.infer<typeof variantSchema>;
