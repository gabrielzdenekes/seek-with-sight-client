import { useActionState, useState } from "react";
import {
    Box, Button, Grid, Paper, Stack, TextField, Typography,
    MenuItem, IconButton
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCreateProduct } from "@/features/products/create/useCreateProduct";
import { productSchema } from "@/features/products/create/createProductSchema";
import { useSearchCategories } from "@/features/categories/useSearchCategories";
import { FormAutocomplete } from "@/features/products/create/SearchAutocomplete";
import { useSearchBrands } from "@/features/brands/useSearchBrands";

interface ActionState {
    errors?: Record<string, string>;
    success?: boolean;
}

export default function CreateProductPage() {
    const [images, setImages] = useState<File[]>([]);
    const createMutation = useCreateProduct();

    function useCategoryOptions(searchTerm: string) {
        const { data, isLoading } = useSearchCategories(searchTerm);
        return {
            data: data?.data,
            isLoading
        };
    }

    function useBrandOptions(searchTerm: string) {
        const { data, isLoading } = useSearchBrands(searchTerm);
        return {
            data: data?.data,
            isLoading
        };
    }

    const [state, formAction, isPending] = useActionState<ActionState, FormData>(
        async (_, formData) => {
            const rawValues = {
                name: formData.get("name") as string,
                slug: formData.get("slug") as string,
                shortDescription: formData.get("shortDescription") as string,
                description: formData.get("description") as string,
                status: formData.get("status") as string,
                categoryId: formData.get("categoryId") as string,
                brandId: formData.get("brandId") as string,
                price: Number(formData.get("price")),
                quantity: Number(formData.get("quantity")),
            };

            const validation = productSchema.safeParse(rawValues);

            if (!validation.success) {
                const fieldErrors: Record<string, string> = {};
                validation.error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        fieldErrors[issue.path[0].toString()] = issue.message;
                    }
                });

                return { errors: fieldErrors };
            }

            try {
                await createMutation.mutateAsync({
                    productData: validation.data,
                    images
                });

                return { success: true, errors: {} };
            } catch  {
                return { errors: { form: "Failed to create product. Please try again." } };
            }
        },
        { errors: {} }
    );

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    return (
        <Box component="form" action={formAction} sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >
                <Typography variant="h4" sx={{fontWeight: "bold"}}>Create Product</Typography>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isPending}
                >
                    {isPending ? "Saving..." : "Save Product"}
                </Button>
            </Stack>

            {state.errors?.form && (
                <Typography color="error" sx={{mb: 2}}>{state.errors.form}</Typography>
            )}

            <Grid container spacing={3}>
                <Grid sx={{xs: 12, md: 8}}>
                    <Stack spacing={3}>

                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{mb: 2}}>Basic Information</Typography>
                            <Stack spacing={2}>
                                <TextField
                                    name="name"
                                    label="Product Name"
                                    fullWidth
                                    error={!!state.errors?.name}
                                    helperText={state.errors?.name}
                                />
                                <TextField
                                    name="slug"
                                    label="Slug (URL)"
                                    fullWidth
                                    error={!!state.errors?.slug}
                                    helperText={state.errors?.slug}
                                />
                                <TextField
                                    name="shortDescription"
                                    label="Short Description"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    error={!!state.errors?.shortDescription}
                                    helperText={state.errors?.shortDescription}
                                />
                                <TextField
                                    name="description"
                                    label="Full Description"
                                    multiline
                                    rows={5}
                                    fullWidth
                                    error={!!state.errors?.description}
                                    helperText={state.errors?.description}
                                />
                            </Stack>
                        </Paper>

                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{mb: 2}}>Media</Typography>
                            <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
                                Upload Images
                                <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
                            </Button>
                            <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
                                {images.map((img, idx) => (
                                    <Box key={idx} sx={{ position: "relative", width: 100, height: 100 }}>
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt="preview"
                                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                                        />
                                        <IconButton
                                            size="small"
                                            color="error"
                                            sx={{ position: "absolute", top: -8, right: -8, bgcolor: "background.paper" }}
                                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>

                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{mb: 2}}>Pricing & Inventory</Typography>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    name="price"
                                    type="number"
                                    label="Price"
                                    defaultValue={0}
                                    fullWidth
                                    error={!!state.errors?.price}
                                    helperText={state.errors?.price}
                                />
                                <TextField
                                    name="quantity"
                                    type="number"
                                    label="Quantity"
                                    defaultValue={1}
                                    fullWidth
                                    error={!!state.errors?.quantity}
                                    helperText={state.errors?.quantity}
                                />
                            </Stack>
                        </Paper>

                    </Stack>
                </Grid>

                <Grid sx={{xs: 12, md: 4}}>
                    <Stack spacing={3}>

                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{mb: 2}}>Status</Typography>
                            <TextField name="status" select fullWidth defaultValue="DRAFT" label="Product Status">
                                <MenuItem value="ACTIVE">Active</MenuItem>
                                <MenuItem value="DRAFT">Draft</MenuItem>
                                <MenuItem value="ARCHIVED">Archived</MenuItem>
                            </TextField>
                        </Paper>

                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{mb: 2}}>Organization</Typography>
                            <Stack spacing={2}>
                                <FormAutocomplete
                                    name="categoryId"
                                    label="Category"
                                    useQueryHook={useCategoryOptions}
                                    error={state.errors?.categoryId}
                                />
                                <FormAutocomplete
                                    name="brandId"
                                    label="Brand"
                                    useQueryHook={useBrandOptions}
                                    error={state.errors?.brandId}
                                />
                            </Stack>
                        </Paper>

                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
