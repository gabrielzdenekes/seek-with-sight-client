export interface OnSaleProduct {
  discountPercentage: number;
  imageUrl: string | null;
  name: string;
  price: number;
  saleEndDate: string | null;
  salePrice: number | null;
}

export interface NewArrivalProduct {
  discountPercentage: number;
  imageUrl: string | null;
  name: string;
  price: number;
  saleEndDate: string | null;
  salePrice: number | null;
}

export interface BestSellingProduct {
  imageUrl: string | null;
  price: number;
  productName: string;
  salePrice: number | null;
  sku: string;
  totalSold: number;
  variantId: string;
  variantTitle: string;
}

export interface BestReviewedProduct {
  averageRating: number;
  discountPercentage: number;
  id: string;
  imageUrl: string | null;
  name: string;
  price: number;
  reviewCount: number;
  salePrice: number | null;
  slug: string;
}

export interface LandingProductsData {
  onSale: OnSaleProduct[];
  newArrivals: NewArrivalProduct[];
  bestSelling: BestSellingProduct[];
  bestReviewed: BestReviewedProduct[];
}
