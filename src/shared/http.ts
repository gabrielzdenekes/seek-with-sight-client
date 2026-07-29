import { api } from "@/lib/axios";
import type { ApiErrorResponse } from "@/shared/types";
import { AxiosError } from "axios";

interface RequestConfig {
    headers: { [key: string]: string }
}

export async function get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await api.get<T>(url, config);

    return response.data;
}

export async function post<T, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig
): Promise<T> {
    const response = await api.post<T>(url, data, config);

    return response.data;
}

export async function put<T, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig
): Promise<T> {
    const response = await api.put<T>(url, data, config);

    return response.data;
}

export async function patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: RequestConfig
): Promise<T> {
    const response = await api.patch<T>(url, data, config);

    return response.data;
}

export async function del<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await api.delete<T>(url, config);

    return response.data;
}

export function tryResolveApiErrorResponse(error: any): ApiErrorResponse | null {
    let apiErrorResponse = null;

    if (error instanceof AxiosError) {
        apiErrorResponse = error?.response?.data as ApiErrorResponse;
    }

    return apiErrorResponse;
}
