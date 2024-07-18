import { useState } from "react";
import useBookSearch from "@/hooks/useBookSearch";
import { AdapterFunction, Book, BuildUrlFunction } from "@/types";

const useGenericBookSearch = <T>(
  initialQuery: string,
  apiUrl: string,
  adapter: AdapterFunction<T, Book[]>,
  buildUrl: BuildUrlFunction
) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data, isLoading, isError } = useBookSearch(
    searchQuery,
    apiUrl,
    adapter,
    buildUrl
  );

  const handleSearch = (search: string) => {
    setSearchQuery(search);
  };

  return { data, isLoading, isError, handleSearch };
};

export default useGenericBookSearch;
