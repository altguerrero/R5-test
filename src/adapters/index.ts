import {
  Book,
  GoogleBooksResponse,
  OpenLibraryResponse,
  BookDetails,
  OpenLibraryAuthorResponse,
  OpenLibraryDoc,
  OpenLibrarySearchResponse,
} from "@/types";
import axios from "axios";

export const adapterGoogleBooksApi = (data: GoogleBooksResponse): Book[] => {
  return data.items.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
    imgURL: item.volumeInfo.imageLinks?.thumbnail || "",
  }));
};

export const adapterOpenLibraryApi = (
  data: OpenLibrarySearchResponse
): Book[] => {
  return data.docs.map((item: OpenLibraryDoc) => ({
    id: item.key.replace("/works/", ""),
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

export const adapterOpenLibraryDetails = async (
  data: OpenLibraryResponse
): Promise<BookDetails> => {
  const {
    title,
    description,
    covers,
    created,
    last_modified,
    latest_revision,
    revision,
    authors,
    key,
  } = data;

  const authorPromises = authors.map(async (author) => {
    const authorResponse = await axios.get<OpenLibraryAuthorResponse>(
      `https://openlibrary.org${author.author.key}.json`
    );
    return { key: author.author.key, name: authorResponse.data.name };
  });

  const authorDetails = await Promise.all(authorPromises);

  const bookDescription =
    typeof description === "string"
      ? description
      : description?.value || "No description available";

  return {
    id: key.replace("/works/", ""),
    title,
    description: bookDescription,
    imgURL:
      covers && covers.length > 0
        ? `https://covers.openlibrary.org/b/id/${covers[0] !== -1 ? covers[0] : covers[1]}-L.jpg`
        : "",
    created: created.value,
    lastModified: last_modified.value,
    latestRevision: latest_revision,
    revision,
    authors: authorDetails,
  };
};
