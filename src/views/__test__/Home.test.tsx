import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/views/Home";
import useGoogleBookSearch from "@/hooks/useGoogleBookSearch";
import { Book } from "@/types";

jest.mock("@/hooks/useGoogleBookSearch");
const mockedUseGoogleBookSearch = useGoogleBookSearch as jest.Mock;

const queryClient = new QueryClient();

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Home view", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    mockedUseGoogleBookSearch.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      handleSearch: jest.fn(),
    });

    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getAllByTestId("skeleton-image")).toHaveLength(10);
    expect(screen.getAllByTestId("skeleton-text")).toHaveLength(10);
  });

  it("renders error state", () => {
    mockedUseGoogleBookSearch.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      handleSearch: jest.fn(),
    });

    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders data correctly", async () => {
    const mockBooks: Book[] = [{ title: "Test Book", id: "1", imgURL: "" }];

    mockedUseGoogleBookSearch.mockReturnValue({
      data: mockBooks,
      isLoading: false,
      isError: false,
      handleSearch: jest.fn(),
    });

    render(<Home />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Test Book")).toBeInTheDocument();
    });
  });
});
