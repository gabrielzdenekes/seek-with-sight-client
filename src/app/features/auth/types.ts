import type React from "react";

export interface User {
    id: string;

    email: string;
}

export interface LoginCredentials {
    email: string;

    password: string;
}

export interface RegisterData {
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

    login: (credentials: LoginCredentials) => Promise<AuthResponse>;

    register: (data: RegisterData) => Promise<User>;

    logout: () => Promise<void>;

    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}
