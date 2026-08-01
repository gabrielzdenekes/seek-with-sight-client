import { StyledCard, StyledActionArea, ImageContainer, StyledCardMedia, BadgeChip } from "@/features/products/landing/product-card/styles";
import type { ProductCardDisplayData } from "@/features/products/landing/product-card/types";
import { CardContent, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface ProductCardProps {
    product: ProductCardDisplayData;
}
export default function ProductCard({ product }: ProductCardProps) {
    const hasDiscount = product.discountPercentage !== undefined && product.discountPercentage > 0;

    return (
        <StyledCard elevation={0}>
            <StyledActionArea>
                <ImageContainer>
                    <StyledCardMedia
                        component="img"
                        image={product.imageUrl || "/placeholder.png"}
                    />

                    {hasDiscount && (
                        <BadgeChip
                            label={`-${product.discountPercentage}%`}
                            color="error"
                            size="small"
                        />
                    )}

                    {product.rating !== undefined && (
                        <BadgeChip
                            icon={<StarIcon sx={{ color: "#faaf00 !important" }} />}
                            label={`${product.rating}`}
                            size="small"
                            sx={{ backgroundColor: "background.paper" }}
                        />
                    )}
                </ImageContainer>

                <CardContent sx={{ px: 0, py: 1.5, flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.primary" noWrap title={product.name}>
                        {product.name}
                    </Typography>

                    {product.variantTitle && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                            {product.variantTitle}
                        </Typography>
                    )}

                    {product.totalSold !== undefined && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                            {`${product.totalSold} sold`}
                        </Typography>
                    )}

                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mt: 0.5 }}>
                        <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
                            {`$${(product.salePrice ?? product.price).toFixed(2)}`}
                        </Typography>

                        {product.salePrice && product.salePrice < product.price && (
                            <Typography variant="body2" color="text.disabled" sx={{ textDecoration: "line-through" }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </StyledActionArea>
        </StyledCard>
    );
}
