import { render, screen } from "@testing-library/react";
import BookSkeleton from "../BookSkeleton";

describe("BookSkeleton", () => {
  it("renders skeleton elements correctly", () => {
    render(<BookSkeleton />);

    const skeletonImage = screen.getByTestId("skeleton-image");
    expect(skeletonImage).toBeInTheDocument();
    expect(skeletonImage).toHaveClass(
      "mb-4 h-[270px] w-full rounded-lg bg-gray-300"
    );

    const skeletonText = screen.getByTestId("skeleton-text");
    expect(skeletonText).toBeInTheDocument();
    expect(skeletonText).toHaveClass("h-4 w-3/4 rounded bg-gray-300");
  });
});
