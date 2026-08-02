import { appConfig } from "@/config";
import { QueryClient } from "@tanstack/react-query";

const queryConfig = appConfig.query;

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: queryConfig.staleTimeMs,
            gcTime: queryConfig.gcTimeMs,
            refetchOnWindowFocus: queryConfig.refetchOnWindowFocus,
            retry: queryConfig.retryCount,
        },
    },
});
