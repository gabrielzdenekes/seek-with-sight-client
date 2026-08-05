import { Box, Button, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { DraftVariant } from "./useProductVariants";
import VariantCard from "./VariantCard";
import * as styles from "./styles";

interface VariantSectionProps {
    variants: DraftVariant[];
    onAddVariant: () => void;
    onRemoveVariant: (id: string) => void;
    onUpdateVariant: (id: string, field: keyof DraftVariant, value: string) => void;
    onImageUpload: (id: string, files: FileList | null) => void;
    onImageRemove: (variantId: string, imageId: string) => void;
}

export default function VariantSection({
    variants,
    onAddVariant,
    onRemoveVariant,
    onUpdateVariant,
    onImageUpload,
    onImageRemove
}: VariantSectionProps) {
    return (
        <Box sx={styles.sectionContainerSx}>
            {variants.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    No variants added yet. Click below to add product variants.
                </Typography>
            ) : (
                <Stack spacing={2} sx={{ mb: 2 }}>
                    {variants.map((variant, index) => (
                        <VariantCard
                            key={variant.id}
                            variant={variant}
                            index={index}
                            onUpdate={onUpdateVariant}
                            onRemove={onRemoveVariant}
                            onImageUpload={onImageUpload}
                            onImageRemove={onImageRemove}
                        />
                    ))}
                </Stack>
            )}

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={onAddVariant}
                size="small"
            >
                Add Variant
            </Button>
        </Box>
    );
}
