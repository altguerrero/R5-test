import React from "react";
import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import useBookSearch from "../useBookSearch";
import { Book } from "@/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAdapter = jest.fn((data) => data);
const mockBuildUrl = jest.fn(
  (apiUrl, searchQuery) => `${apiUrl}?q=${searchQuery}`
);

const queryClient = new QueryClient();

interface TestComponentProps {
  searchQuery: string;
  apiUrl: string;
  adapter: typeof mockAdapter;
  buildUrl: typeof mockBuildUrl;
}

const TestComponent: React.FC<TestComponentProps> = ({
  searchQuery,
  apiUrl,
  adapter,
  buildUrl,
}) => {
  const { data, isSuccess, isError } = useBookSearch(
    searchQuery,
    apiUrl,
    adapter,
    buildUrl
  );

  if (isError) return <span>Error</span>;
  if (isSuccess && data.length > 0) return <span>{data[0].title}</span>;

  return null;
};

describe("useBookSearch", () => {
  const searchQuery = "test";
  const apiUrl = "https://api.example.com/books";
  const mockData = [{ title: "Example Book" }];
  const expectedBooks: Book[] = [{ title: "Example Book", id: "", imgURL: "" }];

  it("fetches and adapts data correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent
          searchQuery={searchQuery}
          apiUrl={apiUrl}
          adapter={mockAdapter}
          buildUrl={mockBuildUrl}
        />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(getByText(expectedBooks[0].title)).toBeInTheDocument()
    );

    expect(mockAdapter).toHaveBeenCalledWith(mockData);
    expect(mockBuildUrl).toHaveBeenCalledWith(apiUrl, searchQuery);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${apiUrl}?q=${searchQuery}`);
  });
});
