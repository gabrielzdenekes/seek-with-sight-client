import type { AuthContextType, AuthResponse, CustomerProfileResponse, LoginCredentials, RegisterCustomerData, RegisterSellerData, SellerProfileResponse, User } from "@/features/auth/types";
import { post } from "@/shared/http";
import type { ApiResponse } from "@/shared/types";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "@/features/auth/context/useAuth";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const setAuthData = (token: string | null, userData: User | null): void => {
        setAccessToken(token);
        setUser(userData);
    };

    useEffect(() => {
        async function initializeAuth() {
            try {
                const response = await post<ApiResponse<AuthResponse>>("/auth/refresh");

                setAuthData(
                    response.data?.accessToken || null,
                    response.data?.user || null
                );
            } catch {
                setAuthData(null, null);
            } finally {
                setIsLoading(false);
            }
        }

        initializeAuth();
    }, []);

    const login = async (credentials: LoginCredentials): Promise<AuthResponse | undefined> => {
        const response = await post<ApiResponse<AuthResponse>>("/auth/login", credentials);

        setAuthData(
            response.data?.accessToken || null,
            response.data?.user || null
        );

        return response.data;
    };

    const registerCustomer = async (registerData: RegisterCustomerData): Promise<CustomerProfileResponse | undefined> => {
        const response = await post<ApiResponse<CustomerProfileResponse>>("/customer-profiles", registerData);

        return response.data;
    };

    const registerSeller = async (registerData: RegisterSellerData): Promise<SellerProfileResponse | undefined> => {
        const response = await post<ApiResponse<SellerProfileResponse>>("/seller-profiles", registerData);

        return response.data;
    };

    const logout = async (): Promise<void> => {
        try {
            await post("/auth/logout");
        } catch (error) {
            console.error("Logout failed on backend:", error);
        } finally {
            setAuthData(null, null);
        }
    };

    const value: AuthContextType = {
        user,
        accessToken,
        isLoading,
        isAuthenticated: Boolean(accessToken),
        login,
        registerCustomer,
        registerSeller,
        logout,
        setAccessToken,
    };

    return <AuthContext value={value}>{children}</AuthContext>;
};
