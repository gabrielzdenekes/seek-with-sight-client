import type { CategorySearchItem } from "@/features/categories/types";
import { get } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

function searchCategories(searchTerm: string) {
    return get<ApiResponse<CategorySearchItem[]>>(`/api/categories/search?q=${searchTerm}`);
}

export function useSearchCategories(searchTerm: string) {
    return useQuery({
        queryKey: ["brands", searchTerm],
        queryFn: () => searchCategories(searchTerm)
    });
}
