export interface AppConfig {
    api: {
        baseURL: string,
        withCredentials: boolean,
        headers: { [key: string]: string }
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
        }
    }
);
