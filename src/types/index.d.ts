export interface Book {
  id: string;
  title: string;
  imgURL: string;
}

export interface GoogleBooksVolumeInfo {
  title: string;
  imageLinks?: {
    thumbnail: string;
  };
}

export interface GoogleBooksItem {
  id: string;
  volumeInfo: GoogleBooksVolumeInfo;
}

export interface GoogleBooksResponse {
  items: GoogleBooksItem[];
}

export interface OpenLibraryDoc {
  key: string;
  title: string;
  cover_i?: number;
}

export interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
}

export type AdapterFunction<T> = (data: T) => Book[];

export type BuildUrlFunction = (apiUrl: string, searchQuery: string) => string;
