import { useTranslation } from "react-i18next";
import { useCreateProduct } from "@/features/products/create/useCreateProduct";
import { productSchema } from "@/features/products/create/createProductSchema";
import GenericForm from "@/components/ui/form/GenericForm";
import type { FormSectionDef } from "@/components/ui/form/form.types";
import * as styles from "./styles";
import { useProductMediaUpload } from "@/features/products/create/useProductMediaUpload";
import { useProductVariants } from "@/features/products/variants/useProductVariants";
import { getBasicInfoSection } from "@/pages/products/create/sections/basicInfoSection";
import { getMediaSection } from "@/pages/products/create/sections/mediaSection";
import { getOrganizationSection } from "@/pages/products/create/sections/organizationSection";
import { getPricingSection } from "@/pages/products/create/sections/pricingSection";
import { getStatusSection } from "@/pages/products/create/sections/statusSection";
import { getVariantSection } from "@/pages/products/create/sections/variantSection";

export default function CreateProductPage() {
    const { t } = useTranslation();
    const createMutation = useCreateProduct();
    const { images, rawFiles, handleImageUpload, handleRemoveImage, clearImages } = useProductMediaUpload();
    const {
        variants,
        addVariant,
        removeVariant,
        updateVariant,
        handleVariantImageUpload,
        handleRemoveVariantImage,
        clearVariants
    } = useProductVariants();

    const handleCreateProduct = async (formData: any) => {
        const formattedVariants = variants.map((v) => ({
            title: v.title,
            sku: v.sku,
            price: Number(v.price),
            quantity: Number(v.quantity),
            images: v.images.map((img) => img.file)
        }));

        await createMutation.mutateAsync({
            productData: formData,
            images: rawFiles,
            variants: formattedVariants
        });
    };

    const handleFormSuccess = () => {
        clearImages();
        clearVariants();
    };

    const productSections: FormSectionDef[] = [
        getBasicInfoSection(t),
        getMediaSection({ t, images, handleImageUpload, handleRemoveImage }),
        getPricingSection(),
        getStatusSection(),
        getOrganizationSection(t),
        getVariantSection({
            variants,
            addVariant,
            removeVariant,
            updateVariant,
            handleVariantImageUpload,
            handleRemoveVariantImage
        })
    ];

    return (
        <GenericForm
            sections={productSections}
            action={handleCreateProduct}
            schema={productSchema}
            submitLabelKey="products.create.submit"
            containerSx={styles.formContainerSx}
            onFormSuccess={handleFormSuccess}
        />
    );
}
