import type { ProductCardDisplayData } from "@/features/products/landing/product-card/types";
import ProductSection from "@/features/products/landing/product-section/ProductSection";
import { SectionStack, StyledMainContainer } from "@/features/products/landing/styles";
import type { BestReviewedProduct, BestSellingProduct, LandingProductsData, NewArrivalProduct, OnSaleProduct } from "@/features/products/landing/types";


interface MainViewProps {
    data: LandingProductsData;
}

const mapOnSale = (item: OnSaleProduct, idx: number): ProductCardDisplayData => ({
    id: `on-sale-${idx}`,
    name: item.name,
    price: item.price,
    salePrice: item.salePrice,
    imageUrl: item.imageUrl,
    discountPercentage: item.discountPercentage,
});

const mapNewArrival = (item: NewArrivalProduct, idx: number): ProductCardDisplayData => ({
    id: `new-arrival-${idx}`,
    name: item.name,
    price: item.price,
    salePrice: item.salePrice,
    imageUrl: item.imageUrl,
    discountPercentage: item.discountPercentage,
});

const mapBestSelling = (item: BestSellingProduct): ProductCardDisplayData => ({
    id: item.variantId,
    name: item.productName,
    price: item.price,
    salePrice: item.salePrice,
    imageUrl: item.imageUrl,
    totalSold: item.totalSold,
    variantTitle: item.variantTitle,
});

const mapBestReviewed = (item: BestReviewedProduct): ProductCardDisplayData => ({
    id: item.id,
    name: item.name,
    price: item.price,
    salePrice: item.salePrice,
    imageUrl: item.imageUrl,
    discountPercentage: item.discountPercentage,
    rating: item.averageRating,
    reviewCount: item.reviewCount,
});

export default function ProductsLanding({ data }: MainViewProps) {
    const onSaleProducts = data.onSale.map(mapOnSale);
    const newArrivalProducts = data.newArrivals.map(mapNewArrival);
    const bestSellingProducts = data.bestSelling.map(mapBestSelling);
    const bestReviewedProducts = data.bestReviewed.map(mapBestReviewed);

    return (
        <StyledMainContainer maxWidth="lg">
            <SectionStack>
                <ProductSection title="On Sale" products={onSaleProducts} />
                <ProductSection title="New Arrivals" products={newArrivalProducts} />
                <ProductSection title="Best Selling" products={bestSellingProducts} />
                <ProductSection title="Best Reviewed" products={bestReviewedProducts} />
            </SectionStack>
        </StyledMainContainer>
    );
}
