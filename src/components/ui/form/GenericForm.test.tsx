import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import GenericForm from "@/components/ui/form/GenericForm";
import { onSubmitAction } from "@/components/ui/form/on-submit-action";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}));

vi.mock("@/components/ui/form/on-submit-action", () => ({
    onSubmitAction: vi.fn()
}));

describe("GenericForm", () => {
    const mockFields = [
        { name: "email", labelKey: "email.label", type: "email" },
        { name: "username", labelKey: "username.label", type: "text" }
    ] as any;

    const mockAction = vi.fn();
    const mockSchema = {} as any;
    const mockOnFormSuccess = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders all provided fields, children, and actual SubmitButton", () => {
        renderComponent();

        expect(screen.getByLabelText("email.label")).toHaveAttribute("type", "email");
        expect(screen.getByLabelText("username.label")).toHaveAttribute("type", "text");
        expect(screen.getByRole("button", { name: "submit.key" })).toBeInTheDocument();
        expect(screen.getByTestId("extra-child")).toBeInTheDocument();
    });

    it("displays error messages on fields when validation fails from the server action", async () => {
        const user = userEvent.setup();

        vi.mocked(onSubmitAction).mockResolvedValueOnce({
            errors: { email: ["error.email.invalid"] },
            message: "error.form.invalid",
            success: false
        });

        renderComponent();

        await user.click(screen.getByRole("button", { name: "submit.key" }));

        await waitFor(() => {
            expect(screen.getByText("error.email.invalid")).toBeInTheDocument();
            expect(screen.getByText("error.form.invalid")).toBeInTheDocument();
            expect(screen.getByRole("alert")).toHaveTextContent("error.form.invalid");
        });

        expect(mockOnFormSuccess).not.toHaveBeenCalled();
    });

    it("calls onFormSuccess when the form action resolves successfully", async () => {
        const user = userEvent.setup();

        vi.mocked(onSubmitAction).mockResolvedValueOnce({
            errors: {},
            message: "success.message",
            success: true
        });

        renderComponent();

        await user.click(screen.getByRole("button", { name: "submit.key" }));

        await waitFor(() => {
            expect(mockOnFormSuccess).toHaveBeenCalledTimes(1);
            expect(screen.getByText("success.message")).toBeInTheDocument();
        });
    });

    function renderComponent() {
        render(
            <GenericForm
                fields={mockFields}
                action={mockAction}
                schema={mockSchema}
                onFormSuccess={mockOnFormSuccess}
                submitLabelKey="submit.key"
            >
                <div data-testid="extra-child">Extra Content</div>
            </GenericForm>
        );
    }
});
