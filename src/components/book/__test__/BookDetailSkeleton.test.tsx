import { render, screen } from "@testing-library/react";
import BookDetailSkeleton from "../BookDetailSkeleton";

describe("BookDetailSkeleton", () => {
  it("renders all skeleton elements correctly", () => {
    render(<BookDetailSkeleton />);

    expect(screen.getByTestId("skeleton-bookmark-top")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-image")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-title")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-bookmark-bottom")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-author-1")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-author-2")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-date-1")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-date-2")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-date-3")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-date-4")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-content-1")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-content-2")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-content-3")).toBeInTheDocument();
  });
});
