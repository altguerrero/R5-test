import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Book, AdapterFunction, BuildUrlFunction } from "@/types";

interface FetchBooksParams {
  searchQuery: string;
  apiUrl: string;
  adapter: AdapterFunction;
  buildUrl: BuildUrlFunction;
}

const fetchBooks = async ({
  searchQuery,
  apiUrl,
  adapter,
  buildUrl,
}: FetchBooksParams): Promise<Book[]> => {
  const { data } = await axios.get(buildUrl(apiUrl, searchQuery));
  return adapter(data);
};

const useBookSearch = (
  searchQuery: string,
  apiUrl: string,
  adapter: AdapterFunction,
  buildUrl: BuildUrlFunction
): UseQueryResult<Book[]> => {
  const queryKey = ["books", { apiUrl, searchQuery }];

  return useQuery({
    queryKey,
    queryFn: () => fetchBooks({ searchQuery, apiUrl, adapter, buildUrl }),
    enabled: !!searchQuery,
  });
};

export default useBookSearch;
