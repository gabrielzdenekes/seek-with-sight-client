import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RegisterCustomerPage from "@/pages/auth/RegisterCustomerPage";
import { useAuth } from "@/features/auth/context/useAuth";
import userEvent from "@testing-library/user-event";

vi.mock("@/features/auth/context/useAuth", () => ({
    useAuth: vi.fn(),
}));

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

describe("RegisterCustomerPage", () => {
    const mockRegisterCustomer = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useAuth).mockReturnValue({
            registerCustomer: mockRegisterCustomer
        } as any);
    });

    it("render the initial registration form view correctly", () => {
        renderComponent();

        expect(screen.getByRole("img", { name: "common.logoAlt" })).toBeInTheDocument();
        expect(screen.getByText("register.customer.title")).toBeInTheDocument();
        expect(screen.getByText("register.subtitle")).toBeInTheDocument();

        expect(screen.getByLabelText("common.fields.firstName")).toBeInTheDocument();
        expect(screen.getByLabelText("common.fields.lastName")).toBeInTheDocument();
        expect(screen.getByLabelText("common.fields.phone")).toBeInTheDocument();
        expect(screen.getByLabelText("common.fields.email")).toBeInTheDocument();
        expect(screen.getByLabelText("common.fields.password")).toBeInTheDocument();
        expect(screen.getByLabelText("common.fields.confirmPassword")).toBeInTheDocument();

        expect(screen.getByRole("button", { name: "register.submit" })).toBeInTheDocument();
        expect(screen.getByText("common.social.google")).toBeInTheDocument();
    });

    it("contains navigation links pointing to login and seller registration", () => {
        renderComponent();

        const loginLink = screen.getByRole("link", { name: "register.loginLink" });
        const sellerLink = screen.getByRole("link", { name: "register.customer.sellerLink" });

        expect(loginLink).toHaveAttribute("href", "/login");
        expect(sellerLink).toHaveAttribute("href", "/register/seller");
    });

    it("switches to success view after successful registration", async () => {
        const user = userEvent.setup();

        mockRegisterCustomer.mockResolvedValueOnce({ id: "123", email: "test@example.com" });

        renderComponent();

        const password = "password@1_";

        await user.type(screen.getByLabelText("common.fields.firstName"), "Jane");
        await user.type(screen.getByLabelText("common.fields.lastName"), "Doe");
        await user.type(screen.getByLabelText("common.fields.email"), "jane@example.com");
        await user.type(screen.getByLabelText("common.fields.password"), password);
        await user.type(screen.getByLabelText("common.fields.confirmPassword"), password);
        await user.type(screen.getByLabelText("common.fields.phone"), "647123123");

        await user.click(screen.getByRole("button", { name: "register.submit" }));

        expect(await screen.findByText("register.successTitle")).toBeInTheDocument();
        expect(screen.getByText("register.customer.verifyEmailMessage")).toBeInTheDocument();

        const goToLoginBtn = screen.getByRole("link", { name: "register.customer.goToLogin" });
        expect(goToLoginBtn).toBeInTheDocument();
        expect(goToLoginBtn).toHaveAttribute("href", "/login");

        expect(screen.queryByText("register.customer.title")).not.toBeInTheDocument();
    });

    function renderComponent() {
        render(
            <MemoryRouter>
                <RegisterCustomerPage />
            </MemoryRouter>
        );
    }
});
