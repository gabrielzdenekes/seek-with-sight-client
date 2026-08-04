import { useEffect, useRef, useState } from "react";
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

import * as styles from "./styles";
import GenericForm from "@/components/ui/form/GenericForm";

function useCategoryOptions(searchTerm: string) {
    const { data, isLoading } = useSearchCategories(searchTerm);
    return {
        data: data?.data,
        isLoading,
    };
}

function useBrandOptions(searchTerm: string) {
    const { data, isLoading } = useSearchBrands(searchTerm);
    return {
        data: data?.data,
        isLoading,
    };
}

export default function CreateProductPage() {
    const [images, setImages] = useState<File[]>([]);
    const createMutation = useCreateProduct();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    useEffect(() => {
        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            images.forEach((file) => dataTransfer.items.add(file));
            fileInputRef.current.files = dataTransfer.files;
        }
    }, [images]);

    const handleRemoveImage = (indexToRemove: number) => {
        setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleCreateProduct = async (formData: ProductFormValues) => {
        await createMutation.mutateAsync({
            productData: formData,
            images,
        });
    };

    return (
        <GenericForm
            fields={[]}
            action={handleCreateProduct}
            schema={productSchema}
            submitLabelKey="Save Product"
            containerSx={styles.formContainerSx}
            onFormSuccess={() => setImages([])}
        >
            <Stack spacing={3}>
                <Paper sx={styles.paperCardSx}>
                    <Typography variant="h6" sx={styles.sectionTitleSx}>
                        Basic Information
                    </Typography>
                    <Stack spacing={2}>
                        <TextField name="name" label="Product Name" fullWidth />
                        <TextField name="slug" label="Slug (URL)" fullWidth />
                        <TextField
                            name="shortDescription"
                            label="Short Description"
                            multiline
                            rows={2}
                            fullWidth
                        />
                        <TextField
                            name="description"
                            label="Full Description"
                            multiline
                            rows={5}
                            fullWidth
                        />
                    </Stack>
                </Paper>

                <Paper sx={styles.paperCardSx}>
                    <Typography variant="h6" sx={styles.sectionTitleSx}>
                        Media
                    </Typography>
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        sx={styles.uploadButtonSx}
                    >
                        Upload Images
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="images"
                            hidden
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </Button>

                    <Stack direction="row" spacing={2} sx={styles.imageScrollStackSx}>
                        {images.map((img, idx) => (
                            <Box key={`${img.name}-${idx}`} sx={styles.imagePreviewBoxSx}>
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={`Preview ${idx + 1}`}
                                    style={styles.imagePreviewImgStyle}
                                />
                                <IconButton
                                    size="small"
                                    color="error"
                                    sx={styles.deleteIconButtonSx}
                                    onClick={() => handleRemoveImage(idx)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                </Paper>

                <Paper sx={styles.paperCardSx}>
                    <Typography variant="h6" sx={styles.sectionTitleSx}>
                        Pricing & Inventory
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            name="price"
                            type="number"
                            label="Price"
                            defaultValue={0}
                            fullWidth
                        />
                        <TextField
                            name="quantity"
                            type="number"
                            label="Quantity"
                            defaultValue={1}
                            fullWidth
                        />
                    </Stack>
                </Paper>

                <Paper sx={styles.paperCardSx}>
                    <Typography variant="h6" sx={styles.sectionTitleSx}>
                        Status
                    </Typography>
                    <TextField
                        name="status"
                        select
                        fullWidth
                        defaultValue="DRAFT"
                        label="Product Status"
                    >
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="DRAFT">Draft</MenuItem>
                        <MenuItem value="ARCHIVED">Archived</MenuItem>
                    </TextField>
                </Paper>

                <Paper sx={styles.paperCardSx}>
                    <Typography variant="h6" sx={styles.sectionTitleSx}>
                        Organization
                    </Typography>
                    <Stack spacing={2}>
                        <FormAutocomplete
                            name="categoryId"
                            label="Category"
                            useQueryHook={useCategoryOptions}
                        />
                        <FormAutocomplete
                            name="brandId"
                            label="Brand"
                            useQueryHook={useBrandOptions}
                        />
                    </Stack>
                </Paper>
            </Stack>
        </GenericForm>
    );
}
