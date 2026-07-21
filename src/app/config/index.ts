export interface AppConfig {
    api: {
        baseUrl: string,
        withCredentials: boolean
    }
};

export const config: Readonly<AppConfig> = Object.freeze<AppConfig>(
    {
        api: {
            baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
            withCredentials: true
        }
    }
);
