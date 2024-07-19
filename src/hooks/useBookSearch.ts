import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Book, AdapterFunction, BuildUrlFunction } from "@/types";

interface FetchBooksParams<T> {
  searchQuery: string;
  apiUrl: string;
  adapter: AdapterFunction<T, Book[]>;
  buildUrl: BuildUrlFunction;
}

const fetchBooks = async <T>({
  searchQuery,
  apiUrl,
  adapter,
  buildUrl,
}: FetchBooksParams<T>): Promise<Book[]> => {
  const { data } = await axios.get<T>(buildUrl(apiUrl, searchQuery));
  return adapter(data);
};
const useBookSearch = <T>(
  searchQuery: string,
  apiUrl: string,
  adapter: AdapterFunction<T, Book[]>,
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
