import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GlobalSearch from "../GlobalSearch";

jest.mock("../../Title", () => ({
  Title: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
}));

describe("GlobalSearch", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it("renders the title and search input", () => {
    render(<GlobalSearch title="Test Title" onSearch={mockOnSearch} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBe(2);
  });
});
