import type { BrandSearchItem } from "@/features/brands/types";
import { get } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

function searchBrands(searchTerm: string) {
    return get<ApiResponse<BrandSearchItem[]>>(`/brands/search?q=${searchTerm}`);
}

export function useSearchBrands(searchTerm: string) {
    return useQuery({
        queryKey: ["brands", searchTerm],
        queryFn: () => searchBrands(searchTerm)
    });
}
