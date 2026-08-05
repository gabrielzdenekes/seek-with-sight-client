import type { FormSectionDef } from "@/components/ui/form/form.types";
import VariantSection from "@/features/products/variants/VariantSection";
import type { DraftVariant } from "@/features/products/variants/useProductVariants";

interface GetVariantSectionParams {
    variants: DraftVariant[];
    addVariant: () => void;
    removeVariant: (id: string) => void;
    updateVariant: (id: string, field: keyof DraftVariant, value: string) => void;
    handleVariantImageUpload: (id: string, files: FileList | null) => void;
    handleRemoveVariantImage: (variantId: string, imageId: string) => void;
}

export function getVariantSection({
    variants,
    addVariant,
    removeVariant,
    updateVariant,
    handleVariantImageUpload,
    handleRemoveVariantImage
}: GetVariantSectionParams): FormSectionDef {
    return {
        id: "variants",
        titleKey: "products.create.sections.variants",
        customRender: () => (
            <VariantSection
                variants={variants}
                onAddVariant={addVariant}
                onRemoveVariant={removeVariant}
                onUpdateVariant={updateVariant}
                onImageUpload={handleVariantImageUpload}
                onImageRemove={handleRemoveVariantImage}
            />
        )
    };
}
