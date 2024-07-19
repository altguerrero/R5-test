import useGenericBookSearch from "@/hooks/useGenericBookSearch";
import { adapterOpenLibraryApi, buildUrlOpenLibraryApi } from "@/adapters";

const apiUrl = "https://openlibrary.org/search.json";

const useOpenLibrarySearch = (initialQuery: string) => {
  return useGenericBookSearch(
    initialQuery,
    apiUrl,
    adapterOpenLibraryApi,
    buildUrlOpenLibraryApi
  );
};

export default useOpenLibrarySearch;
