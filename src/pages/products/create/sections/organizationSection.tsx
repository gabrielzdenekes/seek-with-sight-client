import type { TFunction } from "i18next";
import type { FormSectionDef } from "@/components/ui/form/form.types";
import { FormAutocomplete } from "@/features/products/create/SearchAutocomplete";
import { useSearchCategories } from "@/features/categories/useSearchCategories";
import { useSearchBrands } from "@/features/brands/useSearchBrands";
import * as styles from "../styles";

function useCategoryOptions(searchTerm: string) {
    const { data, isLoading } = useSearchCategories(searchTerm);
    return { data: data?.data, isLoading };
}

function useBrandOptions(searchTerm: string) {
    const { data, isLoading } = useSearchBrands(searchTerm);
    return { data: data?.data, isLoading };
}

export const getOrganizationSection = (t: TFunction): FormSectionDef => ({
    id: "organization",
    titleKey: "products.create.sections.organization",
    paperSx: styles.paperCardSx,
    fields: [
        {
            name: "categoryId",
            labelKey: "products.create.fields.category",
            type: "custom",
            customRender: (error) => (
                <FormAutocomplete
                    name="categoryId"
                    label={t("products.create.fields.category")}
                    useQueryHook={useCategoryOptions}
                    error={error ? t(error) : undefined}
                />
            ),
        },
        {
            name: "brandId",
            labelKey: "products.create.fields.brand",
            type: "custom",
            customRender: (error) => (
                <FormAutocomplete
                    name="brandId"
                    label={t("products.create.fields.brand")}
                    useQueryHook={useBrandOptions}
                    error={error ? t(error) : undefined}
                />
            ),
        },
    ],
});
