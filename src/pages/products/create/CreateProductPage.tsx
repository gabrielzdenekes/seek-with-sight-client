import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    MenuItem,
    IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCreateProduct } from "@/features/products/create/useCreateProduct";
import { productSchema, type ProductFormValues } from "@/features/products/create/createProductSchema";
import { useSearchCategories } from "@/features/categories/useSearchCategories";
import { FormAutocomplete } from "@/features/products/create/SearchAutocomplete";
import { useSearchBrands } from "@/features/brands/useSearchBrands";
import GenericForm from "@/components/ui/form/GenericForm";
import * as styles from "./styles";

interface PreviewImage {
    id: string;
    file: File;
    previewUrl: string;
}

function useProductMediaUpload() {
    const [images, setImages] = useState<PreviewImage[]>([]);
    const imagesRef = useRef(images);

    useEffect(() => {
        imagesRef.current = images;
    }, [images]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const newImages: PreviewImage[] = Array.from(e.target.files).map((file) => ({
            id: `${file.name}-${file.lastModified}-${Math.random()}`,
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);
        e.target.value = "";
    };

    const handleRemoveImage = (idToRemove: string) => {
        setImages((prev) => {
            const imageToRemove = prev.find((img) => img.id === idToRemove);
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.previewUrl);
            }
            return prev.filter((img) => img.id !== idToRemove);
        });
    };

    const clearImages = useCallback(() => {
        imagesRef.current.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        setImages([]);
    }, []);

    useEffect(() => {
        return () => {
            imagesRef.current.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        };
    }, []);

    return {
        images,
        rawFiles: images.map((img) => img.file),
        handleImageUpload,
        handleRemoveImage,
        clearImages,
    };
}

function useCategoryOptions(searchTerm: string) {
    const { data, isLoading } = useSearchCategories(searchTerm);
    return { data: data?.data, isLoading };
}

function useBrandOptions(searchTerm: string) {
    const { data, isLoading } = useSearchBrands(searchTerm);
    return { data: data?.data, isLoading };
}

function BasicInfoSection() {
    const { t } = useTranslation();

    return (
        <Paper sx={styles.paperCardSx}>
            <Typography variant="h6" sx={styles.sectionTitleSx}>
                {t("products.create.sections.basicInfo")}
            </Typography>
            <Stack spacing={2}>
                <TextField name="name" label={t("products.create.fields.productName")} fullWidth />
                <TextField name="slug" label={t("products.create.fields.slug")} fullWidth />
                <TextField name="shortDescription" label={t("products.create.fields.shortDescription")} multiline rows={2} fullWidth />
                <TextField name="description" label={t("products.create.fields.description")} multiline rows={5} fullWidth />
            </Stack>
        </Paper>
    );
}

function MediaSection({
    images,
    onUpload,
    onRemove,
}: {
    images: PreviewImage[];
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (id: string) => void;
}) {
    const { t } = useTranslation();

    return (
        <Paper sx={styles.paperCardSx}>
            <Typography variant="h6" sx={styles.sectionTitleSx}>
                {t("products.create.sections.media")}
            </Typography>
            <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={styles.uploadButtonSx}
            >
                {t("products.create.media.upload")}
                <input type="file" hidden multiple accept="image/*" onChange={onUpload} />
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
                            onClick={() => onRemove(img.id)}
                            aria-label={t("products.create.media.removeAria", { number: idx + 1 })}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
}

function PricingSection() {
    const { t } = useTranslation();

    return (
        <Paper sx={styles.paperCardSx}>
            <Typography variant="h6" sx={styles.sectionTitleSx}>
                {t("products.create.sections.pricing")}
            </Typography>
            <Stack spacing={2}>
                <TextField name="price" type="number" label={t("products.create.fields.price")} defaultValue={0} fullWidth />
                <TextField name="quantity" type="number" label={t("products.create.fields.quantity")} defaultValue={1} fullWidth />
            </Stack>
        </Paper>
    );
}

function StatusSection() {
    const { t } = useTranslation();

    return (
        <Paper sx={styles.paperCardSx}>
            <Typography variant="h6" sx={styles.sectionTitleSx}>
                {t("products.create.sections.status")}
            </Typography>
            <TextField name="status" select fullWidth defaultValue="DRAFT" label={t("products.create.fields.status")}>
                <MenuItem value="ACTIVE">{t("products.create.statusOptions.active")}</MenuItem>
                <MenuItem value="DRAFT">{t("products.create.statusOptions.draft")}</MenuItem>
                <MenuItem value="ARCHIVED">{t("products.create.statusOptions.archived")}</MenuItem>
            </TextField>
        </Paper>
    );
}

function OrganizationSection() {
    const { t } = useTranslation();

    return (
        <Paper sx={styles.paperCardSx}>
            <Typography variant="h6" sx={styles.sectionTitleSx}>
                {t("products.create.sections.organization")}
            </Typography>
            <Stack spacing={2}>
                <FormAutocomplete name="categoryId" label={t("products.create.fields.category")} useQueryHook={useCategoryOptions} />
                <FormAutocomplete name="brandId" label={t("products.create.fields.brand")} useQueryHook={useBrandOptions} />
            </Stack>
        </Paper>
    );
}

export default function CreateProductPage() {
    const { t } = useTranslation();
    const createMutation = useCreateProduct();
    const { images, rawFiles, handleImageUpload, handleRemoveImage, clearImages } = useProductMediaUpload();

    const handleCreateProduct = async (formData: ProductFormValues) => {
        await createMutation.mutateAsync({
            productData: formData,
            images: rawFiles,
        });
    };

    return (
        <GenericForm
            fields={[]}
            action={handleCreateProduct}
            schema={productSchema}
            submitLabelKey={t("products.create.submit")}
            containerSx={styles.formContainerSx}
            onFormSuccess={clearImages}
        >
            <Stack spacing={3}>
                <BasicInfoSection />
                <MediaSection images={images} onUpload={handleImageUpload} onRemove={handleRemoveImage} />
                <PricingSection />
                <StatusSection />
                <OrganizationSection />
            </Stack>
        </GenericForm>
    );
}
