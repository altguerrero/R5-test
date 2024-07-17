import {
  Book,
  GoogleBooksResponse,
  OpenLibraryResponse,
  OpenLibraryDoc,
} from "@/types";

// Adapter for API of Google Books
export const adapterGoogleBooksApi = (data: GoogleBooksResponse): Book[] => {
  return data.items.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
    imgURL: item.volumeInfo.imageLinks?.thumbnail || "",
  }));
};

// Adapter for API of Open Library
export const adapterOpenLibraryApi = (data: OpenLibraryResponse): Book[] => {
  return data.docs.map((item: OpenLibraryDoc) => ({
    id: item.key,
    title: item.title,
    imgURL: item.cover_i
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
      : "",
  }));
};

export const buildUrlGoogleBooksApi = (
  apiUrl: string,
  searchQuery: string
): string => {
  return `${apiUrl}${searchQuery}`;
};

export const buildUrlOpenLibraryApi = (
  apiUrl: string,
  searchQuery: string
): string => {
  return `${apiUrl}?q=${searchQuery}&fields=key,title,cover_i&limit=21`;
};
