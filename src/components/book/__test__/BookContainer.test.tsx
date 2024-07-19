import { render, screen } from "@testing-library/react";
import BookContainer from "../BookContainer";

describe("BookContainer", () => {
  it("renders correctly with children", () => {
    render(
      <BookContainer>
        <div data-testid="child">Child Element</div>
      </BookContainer>
    );

    const container = screen.getByTestId("container");
    expect(container).toHaveClass("pt-16");

    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Child Element");
  });
});
