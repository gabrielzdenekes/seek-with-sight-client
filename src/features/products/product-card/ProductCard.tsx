import { StyledCard, StyledActionArea, ImageContainer, StyledCardMedia, BadgeChip, StyledStarIcon, RatingChip } from "@/features/products/product-card/styles";
import type { ProductCardDisplayData } from "@/features/products/product-card/types";
import { CardContent, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface ProductCardProps {
    product: ProductCardDisplayData;
}

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);

export default function ProductCard({ product }: ProductCardProps) {
    const {
        name,
        imageUrl,
        discountPercentage,
        rating,
        variantTitle,
        totalSold,
        price,
        salePrice,
    } = product;

    const hasDiscount = Boolean(discountPercentage && discountPercentage > 0);
    const isOnSale = Boolean(salePrice && salePrice < price);
    const displayPrice = salePrice ?? price;

    return (
        <StyledCard elevation={0}>
            <StyledActionArea>
                <ImageContainer>
                    <StyledCardMedia
                        component="img"
                        src={imageUrl || "/placeholder.png"}
                        alt={name}
                    />

                    {hasDiscount && (
                        <BadgeChip
                            label={`-${discountPercentage}%`}
                            color="error"
                            size="small"
                        />
                    )}

                    {rating !== undefined && (
                        <RatingChip
                            icon={<StyledStarIcon />}
                            label={`${rating}`}
                            size="small"
                            sx={{ backgroundColor: "background.paper" }}
                        />
                    )}
                </ImageContainer>

                <CardContent sx={{ px: 0, py: 1.5, flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.primary" noWrap title={name}>
                        {name}
                    </Typography>

                    {variantTitle && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                            {variantTitle}
                        </Typography>
                    )}

                    {totalSold !== undefined && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                            {totalSold} sold
                        </Typography>
                    )}

                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mt: 0.5 }}>
                        <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
                            {formatCurrency(displayPrice)}
                        </Typography>

                        {isOnSale && (
                            <Typography variant="body2" color="text.disabled" sx={{ textDecoration: "line-through" }}>
                                {formatCurrency(price)}
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </StyledActionArea>
        </StyledCard>
    );
}
