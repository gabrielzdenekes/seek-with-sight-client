export interface ApiResponse<T> {
    message?: string;

    data?: T;

    success: boolean;

    status: number;
}

export interface ApiErrorResponse<T> extends ApiResponse<T> {
    errorCode: string;
}

export interface ApiValidationError {
    fieldName: string;

    errorMessage: string;
}
