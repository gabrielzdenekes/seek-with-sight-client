import type { ChangeEvent } from "react";
import { Box, Card, CardContent, Grid, IconButton, TextField, Typography, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import type { DraftVariant } from "./useProductVariants";
import VariantImageToolbar from "./VariantImageToolbar";
import * as styles from "./styles";

interface VariantCardProps {
    variant: DraftVariant;
    index: number;
    onUpdate: (id: string, field: keyof DraftVariant, value: string) => void;
    onRemove: (id: string) => void;
    onImageUpload: (id: string, files: FileList | null) => void;
    onImageRemove: (variantId: string, imageId: string) => void;
}

export default function VariantCard({
    variant,
    index,
    onUpdate,
    onRemove,
    onImageUpload,
    onImageRemove
}: VariantCardProps) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        onImageUpload(variant.id, e.target.files);
        e.target.value = "";
    };

    return (
        <Card variant="outlined" sx={styles.variantCardSx}>
            <CardContent>
                <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Variant #{index + 1}
                    </Typography>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => onRemove(variant.id)}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </Stack>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Variant Title"
                            fullWidth
                            size="small"
                            value={variant.title}
                            onChange={(e) => onUpdate(variant.id, "title", e.target.value)}
                            placeholder="e.g. Red / XL"
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="SKU"
                            fullWidth
                            size="small"
                            value={variant.sku}
                            onChange={(e) => onUpdate(variant.id, "sku", e.target.value)}
                            placeholder="e.g. PROD-RED-XL"
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Price"
                            fullWidth
                            size="small"
                            type="number"
                            value={variant.price}
                            onChange={(e) => onUpdate(variant.id, "price", e.target.value)}
                            slotProps={{
                                htmlInput: { step: "0.01", min: "0" }
                            }}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Quantity"
                            fullWidth
                            size="small"
                            type="number"
                            value={variant.quantity}
                            onChange={(e) => onUpdate(variant.id, "quantity", e.target.value)}
                            slotProps={{
                                htmlInput: { min: "1", step: "1" }
                            }}
                            required
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1, fontWeight: 500 }}>
                        Variant Images
                    </Typography>
                    <VariantImageToolbar
                        images={variant.images}
                        onUpload={handleFileChange}
                        onRemove={(imageId) => onImageRemove(variant.id, imageId)}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}
