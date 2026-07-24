import type React from "react";

export interface User {
    id: string;

    email: string;
}

export interface CustomerProfileResponse {
    id: string;

    firstName: string;

    lastName: string;

    phone: string;

    user: User;
}

export interface SellerProfileResponse {
    id: string;

    businessName: string;

    businessAddress: string;

    taxId: string;

    user: User;
}

export interface LoginCredentials {
    email: string;

    password: string;
}

export interface RegisterCustomerData {
    email: string;

    password: string;

    firstName: string;

    lastName: string;

    phone: string;
}

export interface RegisterSellerData {
    businessName: string;

    businessAddress: string;

    taxId: string;

    email: string;

    password: string;
}

export interface AuthResponse {
    accessToken: string;

    user: User;
}

export interface AuthContextType {
    user: User | null;

    accessToken: string | null;

    isLoading: boolean;

    isAuthenticated: boolean;

    login: (credentials: LoginCredentials) => Promise<AuthResponse | undefined>;

    registerCustomer: (data: RegisterCustomerData) => Promise<CustomerProfileResponse | undefined>;

    registerSeller: (data: RegisterSellerData) => Promise<SellerProfileResponse | undefined>;

    logout: () => Promise<void>;

    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}
