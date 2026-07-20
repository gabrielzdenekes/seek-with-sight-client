import App from "@/App";
import { render } from "@testing-library/react";

it("CI test", () => {
    const { container } = render(<App />);
    expect(container.tagName).toEqual("DIV");
});
