import { TextField } from "@mui/material";
import type { TFunction } from "i18next";
import type { FormSectionDef } from "@/components/ui/form/form.types";
import * as styles from "../styles";

export const getBasicInfoSection = (t: TFunction): FormSectionDef => ({
    id: "basicInfo",
    titleKey: "products.create.sections.basicInfo",
    paperSx: styles.paperCardSx,
    fields: [
        { name: "name", labelKey: "products.create.fields.productName", type: "text" },
        { name: "slug", labelKey: "products.create.fields.slug", type: "text" },
        {
            name: "shortDescription",
            labelKey: "products.create.fields.shortDescription",
            type: "custom",
            customRender: (error) => (
                <TextField
                    name="shortDescription"
                    label={t("products.create.fields.shortDescription")}
                    multiline
                    rows={2}
                    fullWidth
                    error={!!error}
                    helperText={error ? t(error) : undefined}
                />
            ),
        },
        {
            name: "description",
            labelKey: "products.create.fields.description",
            type: "custom",
            customRender: (error) => (
                <TextField
                    name="description"
                    label={t("products.create.fields.description")}
                    multiline
                    rows={5}
                    fullWidth
                    error={!!error}
                    helperText={error ? t(error) : undefined}
                />
            ),
        },
    ],
});
