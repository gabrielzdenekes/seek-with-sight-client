export interface AppConfig {
    api: {
        baseURL: string,
        withCredentials: boolean,
        headers: { [key: string]: string }
    },
    authProviders: {
        google: {
            clientId: string
        }
    },
    query: {
        staleTimeMs: number;
        gcTimeMs: number;
        refetchOnWindowFocus: boolean;
        retryCount: number;
    }
};

export const appConfig: Readonly<AppConfig> = Object.freeze<AppConfig>(
    {
        api: {
            baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        },
        authProviders: {
            google: {
                clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
            }
        },
        query: {
            staleTimeMs: 1000 * 60 * 5, // 5 mins
            gcTimeMs: 1000 * 60 * 15, // 15 mins
            refetchOnWindowFocus: false,
            retryCount: 2
        }
    }
);
