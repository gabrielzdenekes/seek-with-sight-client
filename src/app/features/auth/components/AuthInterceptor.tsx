import { api, apiPublic } from "@/lib/axios";
import { useEffect, type ReactNode } from "react";

interface AxiosInterceptorProps {
  children: ReactNode;
}

let isRefreshing = false;
let failedRequestsQueue: unknown[] = [];

const processRequestsQueue = (error: any, token = null) => {
    failedRequestsQueue.forEach((promise: any) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedRequestsQueue = [];
};

export const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
    const { accessToken, setAccessToken, logout } = useAuth();

    useEffect(() => {
        const requestIntercept = api.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"] && accessToken) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {

                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedRequestsQueue.push({ resolve, reject });
                        })
                            .then((token) => {
                                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                                return api(originalRequest);
                            })
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    try {
                        const response = await apiPublic.post("/auth/refresh");
                        const { accessToken: newAccessToken } = response.data;

                        setAccessToken(newAccessToken);

                        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                        processRequestsQueue(null, newAccessToken);

                        return api(originalRequest);
                    } catch (refreshError) {
                        processRequestsQueue(refreshError, null);
                        logout();
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, setAccessToken, logout]);

    return children;
};
