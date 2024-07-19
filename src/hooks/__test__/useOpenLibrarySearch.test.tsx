import React from "react";
import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useOpenLibrarySearch from "@/hooks/useOpenLibrarySearch";
import useGenericBookSearch from "@/hooks/useGenericBookSearch";
import { Book } from "@/types";

jest.mock("@/hooks/useGenericBookSearch");
const mockedUseGenericBookSearch = useGenericBookSearch as jest.Mock;

const queryClient = new QueryClient();

interface TestComponentProps {
  searchQuery: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ searchQuery }) => {
  const { data, isLoading, isError } = useOpenLibrarySearch(searchQuery) as {
    data: Book[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error</span>;
  if (data && data.length > 0) return <span>{data[0].title}</span>;

  return null;
};

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useOpenLibrarySearch", () => {
  const initialQuery = "test query";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    mockedUseGenericBookSearch.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    const { getByText } = render(<TestComponent searchQuery={initialQuery} />, {
      wrapper: createWrapper(),
    });

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockedUseGenericBookSearch.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    const { getByText } = render(<TestComponent searchQuery={initialQuery} />, {
      wrapper: createWrapper(),
    });

    expect(getByText("Error")).toBeInTheDocument();
  });

  it("renders data correctly", async () => {
    const mockBooks: Book[] = [{ title: "Test Book", id: "1", imgURL: "" }];

    mockedUseGenericBookSearch.mockReturnValue({
      data: mockBooks,
      isLoading: false,
      isError: false,
    });

    const { getByText } = render(<TestComponent searchQuery={initialQuery} />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(getByText("Test Book")).toBeInTheDocument());
  });
});
