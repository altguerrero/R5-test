import React from "react";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGenericBookSearch from "../useGenericBookSearch";
import useBookSearch from "@/hooks/useBookSearch";
import { Book } from "@/types";

jest.mock("@/hooks/useBookSearch");

const mockedUseBookSearch = useBookSearch as jest.MockedFunction<
  typeof useBookSearch
>;

describe("useGenericBookSearch", () => {
  const initialQuery = "initial query";
  const apiUrl = "https://api.example.com/books";
  const mockAdapter = jest.fn();
  const mockBuildUrl = jest.fn((apiUrl, query) => `${apiUrl}?q=${query}`);

  const queryClient = new QueryClient();

  const createWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("initializes with correct state and calls useBookSearch with initial query", () => {
    mockedUseBookSearch.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
      fetchStatus: "idle",
    } as never);

    const { result } = renderHook(
      () =>
        useGenericBookSearch(initialQuery, apiUrl, mockAdapter, mockBuildUrl),
      { wrapper: createWrapper }
    );

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(mockedUseBookSearch).toHaveBeenCalledWith(
      initialQuery,
      apiUrl,
      mockAdapter,
      mockBuildUrl
    );
  });

  it("updates search query and fetches new data on handleSearch", async () => {
    const newQuery = "new query";
    const newBooks: Book[] = [{ title: "New Book", id: "1", imgURL: "" }];

    mockedUseBookSearch.mockReturnValue({
      data: newBooks,
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
      fetchStatus: "idle",
    } as never);

    const { result } = renderHook(
      () =>
        useGenericBookSearch(initialQuery, apiUrl, mockAdapter, mockBuildUrl),
      { wrapper: createWrapper }
    );

    act(() => {
      result.current.handleSearch(newQuery);
    });

    expect(mockedUseBookSearch).toHaveBeenCalledWith(
      newQuery,
      apiUrl,
      mockAdapter,
      mockBuildUrl
    );

    expect(result.current.data).toEqual(newBooks);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("handles loading state correctly", () => {
    mockedUseBookSearch.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
      status: "loading",
      fetchStatus: "fetching",
    } as never);

    const { result } = renderHook(
      () =>
        useGenericBookSearch(initialQuery, apiUrl, mockAdapter, mockBuildUrl),
      { wrapper: createWrapper }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it("handles error state correctly", () => {
    mockedUseBookSearch.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error("Network Error"),
      status: "error",
      fetchStatus: "idle",
    } as never);

    const { result } = renderHook(
      () =>
        useGenericBookSearch(initialQuery, apiUrl, mockAdapter, mockBuildUrl),
      { wrapper: createWrapper }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});
