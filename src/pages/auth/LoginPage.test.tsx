import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "@/pages/auth/LoginPage";
import { useAuth } from "@/features/auth/context/useAuth";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock("@/features/auth/context/useAuth", () => ({
    useAuth: vi.fn(),
}));

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

vi.mock("@/components/ui/form/on-submit-action", () => ({
    onSubmitAction: vi.fn()
}));

describe("LoginPage", () => {
    const mockLogin = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useAuth).mockReturnValue({
            login: mockLogin
        } as any);
    });

    it("renders the full page including GenericForm and SocialProviders", () => {
        renderComponent();

        expect(screen.getByRole("img", { name: "common.logoAlt" })).toBeInTheDocument();
        expect(screen.getByText("login.title")).toBeInTheDocument();
        expect(screen.getByText("login.subtitle")).toBeInTheDocument();
        expect(screen.getByLabelText("common.fields.email")).toBeInTheDocument();
        expect(screen.getByLabelText("common.fields.password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "login.submit" })).toBeInTheDocument();
        expect(screen.getByText("login.noAccountPrompt")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "login.createAccountLink" })).toHaveAttribute("href", "/register/customer");
        expect(screen.getByText("login.socialPrompt")).toBeInTheDocument();
    });

    function renderComponent() {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
    }
});
