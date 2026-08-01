import { Box, Card, CardActionArea, CardMedia, Chip, styled } from "@mui/material";

export const StyledCard = styled(Card)({
    backgroundColor: "transparent",
    height: "100%",
    display: "flex",
    flexDirection: "column",
});

export const StyledActionArea = styled(CardActionArea)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    "&:hover .MuiCardMedia-root": {
        transform: "scale(1.05)",
    },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    aspectRatio: "4 / 5",
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
}));

export const StyledCardMedia = styled(CardMedia)<{ component?: string }>({
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
});

export const BadgeChip = styled(Chip)({
    position: "absolute",
    top: 8,
    left: 8,
    fontWeight: "bold",
});
