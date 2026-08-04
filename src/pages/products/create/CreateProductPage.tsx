import { useTranslation } from "react-i18next";
import { useCreateProduct } from "@/features/products/create/useCreateProduct";
import { productSchema } from "@/features/products/create/createProductSchema";
import GenericForm from "@/components/ui/form/GenericForm";
import type { FormSectionDef } from "@/components/ui/form/form.types";
import * as styles from "./styles";
import { useProductMediaUpload } from "@/features/products/create/useProductMediaUpload";
import { getBasicInfoSection } from "@/pages/products/create/sections/basicInfoSection";
import { getMediaSection } from "@/pages/products/create/sections/mediaSection";
import { getOrganizationSection } from "@/pages/products/create/sections/organizationSection";
import { getPricingSection } from "@/pages/products/create/sections/pricingSection";
import { getStatusSection } from "@/pages/products/create/sections/statusSection";

export default function CreateProductPage() {
    const { t } = useTranslation();
    const createMutation = useCreateProduct();
    const { images, rawFiles, handleImageUpload, handleRemoveImage, clearImages } = useProductMediaUpload();

    const handleCreateProduct = async (formData: any) => {
        await createMutation.mutateAsync({
            productData: formData,
            images: rawFiles,
        });
    };

    const productSections: FormSectionDef[] = [
        getBasicInfoSection(t),
        getMediaSection({ t, images, handleImageUpload, handleRemoveImage }),
        getPricingSection(),
        getStatusSection(),
        getOrganizationSection(t),
    ];

    return (
        <GenericForm
            sections={productSections}
            action={handleCreateProduct}
            schema={productSchema}
            submitLabelKey="products.create.submit"
            containerSx={styles.formContainerSx}
            onFormSuccess={clearImages}
        />
    );
}
