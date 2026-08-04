import type { ChangeEvent } from "react";
import { Box, Button, IconButton, Typography, Stack } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import type { PreviewImage } from "@/features/products/create/useProductMediaUpload";
import * as styles from "./styles";

interface VariantImageToolbarProps {
    images: PreviewImage[];
    onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
    onRemove: (imageId: string) => void;
}

export default function VariantImageToolbar({
    images,
    onUpload,
    onRemove
}: VariantImageToolbarProps) {
    return (
        <Box sx={styles.toolbarContainerSx}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 2 }}>
                <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    size="small"
                >
                    Upload Images
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={onUpload}
                    />
                </Button>
                <Typography variant="caption" color="text.secondary">
                    {images.length} image(s) attached
                </Typography>
            </Stack>

            {images.length > 0 && (
                <Box sx={styles.previewGridSx}>
                    {images.map((img) => (
                        <Box key={img.id} sx={styles.previewItemSx}>
                            <Box
                                component="img"
                                src={img.previewUrl}
                                alt="Variant Preview"
                                sx={styles.previewImageSx}
                            />
                            <IconButton
                                size="small"
                                onClick={() => onRemove(img.id)}
                                sx={styles.removeButtonSx}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
