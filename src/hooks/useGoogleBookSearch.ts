import { useState } from "react";
import useBookSearch from "@/hooks/useBookSearch";
import { adapterGoogleBooksApi, buildUrlGoogleBooksApi } from "@/adapters";

const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";

const useGoogleBookSearch = (initialQuery: string) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data, isLoading, isError } = useBookSearch(
    searchQuery,
    apiUrl,
    adapterGoogleBooksApi,
    buildUrlGoogleBooksApi
  );

  const handleSearch = (search: string) => {
    setSearchQuery(search);
  };

  return { data, isLoading, isError, handleSearch };
};

export default useGoogleBookSearch;
