import { Book, GoogleBooksResponse } from "@/types";

export const adapterGoogleBooksApi = (data: GoogleBooksResponse): Book[] => {
  return data.items.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
    imgURL: item.volumeInfo.imageLinks?.thumbnail || "",
  }));
};

export const buildUrlGoogleBooksApi = (
  apiUrl: string,
  searchQuery: string
): string => {
  return `${apiUrl}${searchQuery}`;
};
