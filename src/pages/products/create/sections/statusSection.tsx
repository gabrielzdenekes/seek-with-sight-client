import type { FormSectionDef } from "@/components/ui/form/form.types";
import * as styles from "../styles";

export const getStatusSection = (): FormSectionDef => ({
    id: "status",
    titleKey: "products.create.sections.status",
    paperSx: styles.paperCardSx,
    fields: [
        {
            name: "status",
            type: "select",
            labelKey: "products.create.fields.status",
            defaultValue: "DRAFT",
            options: [
                { value: "ACTIVE", labelKey: "products.create.statusOptions.active" },
                { value: "DRAFT", labelKey: "products.create.statusOptions.draft" },
                { value: "ARCHIVED", labelKey: "products.create.statusOptions.archived" },
            ],
        },
    ],
});
