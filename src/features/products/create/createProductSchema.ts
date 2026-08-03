import { z } from "zod";

export const productSchema = z.object({
    name: z.string()
        .min(2, "products.create.validation.productNameMinLength")
        .max(300, "products.create.validation.productNameMaxLength"),

    slug: z.string()
        .max(180, "products.create.validation.slugMaxLength")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "products.create.validation.slugInvalidFormat"),

    shortDescription: z.string()
        .max(500, "products.create.validation.shortDescriptionMaxLength")
        .optional(),

    description: z.string()
        .max(20000, "products.create.validation.descriptionMaxLength")
        .optional(),

    status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED", "OUT_OF_STOCK"]),

    categoryId: z.uuid("products.create.validation.categoryIdInvalid"),

    brandId: z.uuid("products.create.validation.brandIdInvalid"),

    price: z.coerce.number()
        .min(0, "products.create.validation.priceMin"),

    quantity: z.coerce.number()
        .int()
        .min(1, "products.create.validation.quantityMin"),

    images: z.any().array().optional()
});

export type ProductFormValues = z.infer<typeof productSchema>;
