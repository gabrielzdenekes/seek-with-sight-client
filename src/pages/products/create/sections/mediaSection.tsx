import { Box, Button, Stack, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TFunction } from "i18next";
import type { FormSectionDef } from "@/components/ui/form/form.types";
import * as styles from "../styles";
import type { PreviewImage } from "@/features/products/create/useProductMediaUpload";

interface MediaSectionProps {
    t: TFunction;
    images: PreviewImage[];
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: (id: string) => void;
}

export const getMediaSection = ({ t, images, handleImageUpload, handleRemoveImage }: MediaSectionProps): FormSectionDef => ({
    id: "media",
    titleKey: "products.create.sections.media",
    paperSx: styles.paperCardSx,
    customRender: () => (
        <Box>
            <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={styles.uploadButtonSx}
            >
                {t("products.create.media.upload")}
                <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
            </Button>

            <Stack direction="row" spacing={2} sx={styles.imageScrollStackSx}>
                {images.map((img, idx) => (
                    <Box key={img.id} sx={styles.imagePreviewBoxSx}>
                        <img
                            src={img.previewUrl}
                            alt={t("products.create.media.previewAlt", { number: idx + 1 })}
                            style={styles.imagePreviewImgStyle}
                        />
                        <IconButton
                            size="small"
                            color="error"
                            sx={styles.deleteIconButtonSx}
                            onClick={() => handleRemoveImage(img.id)}
                            aria-label={t("products.create.media.removeAria", { number: idx + 1 })}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Stack>
        </Box>
    ),
});
