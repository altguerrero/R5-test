import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { BookDetails, OpenLibraryResponse } from "@/types";
import { adapterOpenLibraryDetails } from "@/adapters";

const fetchBookDetails = async (bookId: string): Promise<BookDetails> => {
  const { data } = await axios.get<OpenLibraryResponse>(
    `https://openlibrary.org/works/${bookId}.json`
  );
  return adapterOpenLibraryDetails(data);
};

const useBookDetails = (bookId: string): UseQueryResult<BookDetails> => {
  const queryKey = ["bookDetails", bookId];

  return useQuery({
    queryKey,
    queryFn: () => fetchBookDetails(bookId),
    enabled: !!bookId,
  });
};

export default useBookDetails;
