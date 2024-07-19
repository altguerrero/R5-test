import useGenericBookSearch from "@/hooks/useGenericBookSearch";
import { adapterGoogleBooksApi, buildUrlGoogleBooksApi } from "@/adapters";

const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";

const useGoogleBookSearch = (initialQuery: string) => {
  return useGenericBookSearch(
    initialQuery,
    apiUrl,
    adapterGoogleBooksApi,
    buildUrlGoogleBooksApi
  );
};

export default useGoogleBookSearch;
