import { createContext, useContext } from "react";
import type { AuthContextType } from "@/features/auth/types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside an <AuthProvider>");
    }

    return context;
};
