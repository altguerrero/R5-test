import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "../Loader";

describe("Loader Component Tests", () => {
  test("renders without crashing", () => {
    render(<Loader />);
    const loaderElement = screen.getByRole("status");
    expect(loaderElement).toBeInTheDocument();
  });

  test("applies custom class name", () => {
    const customClassName = "custom-class";
    render(<Loader className={customClassName} />);
    const svgElement = screen.getByRole("status").querySelector("svg");
    expect(svgElement).toHaveClass(customClassName);
  });

  test("has correct accessibility features", () => {
    render(<Loader />);
    const loaderElement = screen.getByRole("status");
    const svgElement = loaderElement.querySelector("svg");
    const spanElement = screen.getByText("Loading...");

    expect(loaderElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("aria-hidden", "true");
    expect(spanElement).toHaveClass("sr-only");
  });
});
