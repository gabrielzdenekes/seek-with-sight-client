import type { FormSectionDef } from "@/components/ui/form/form.types";
import * as styles from "../styles";

export const getPricingSection = (): FormSectionDef => ({
    id: "pricing",
    titleKey: "products.create.sections.pricing",
    paperSx: styles.paperCardSx,
    fields: [
        { name: "price", type: "number", labelKey: "products.create.fields.price", defaultValue: 0 },
        { name: "quantity", type: "number", labelKey: "products.create.fields.quantity", defaultValue: 1 },
    ],
});
