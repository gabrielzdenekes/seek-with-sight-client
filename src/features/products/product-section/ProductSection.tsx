import { Box, Typography, Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ProductCard from "@/features/products/product-card/ProductCard";
import type { ProductCardDisplayData } from "@/features/products/product-card/types";

interface ProductSectionProps {
    title: string;
    products: ProductCardDisplayData[];
}

export default function ProductSection({ title, products }: ProductSectionProps) {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <Box component="section">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                    {title}
                </Typography>
                <Button endIcon={<ArrowForwardIcon />} sx={{ textTransform: "none", fontWeight: "bold" }}>
                    View all
                </Button>
            </Box>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
