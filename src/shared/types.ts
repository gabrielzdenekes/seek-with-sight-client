export interface ApiResponse<T> {
    message?: string;

    data?: T;

    success: boolean;

    status: number;
}

export interface ApiErrorResponse extends ApiResponse<any> {
    errorCode: string;
}

export interface ApiValidationError {
    fieldName: string;

    errorMessage: string;
}
