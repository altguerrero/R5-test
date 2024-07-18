export interface NavbarLinks {
  route: string;
  label: string;
  imgURl: string;
}

export interface Book {
  id: string;
  title: string;
  imgURL: string;
}

export interface Author {
  key: string;
  name: string;
}

export interface OpenLibraryDoc {
  key: string;
  title: string;
  cover_i?: number;
}

export interface OpenLibrarySearchResponse {
  docs: OpenLibraryDoc[];
}

export interface OpenLibraryDetailsResponse {
  title: string;
  description?: { value: string } | string;
  covers?: number[];
  created: { value: string };
  last_modified: { value: string };
  latest_revision: number;
  revision: number;
  authors: Array<{
    author: {
      key: string;
    };
  }>;
  key: string;
}

export interface OpenLibraryResponse {
  title: string;
  description?: { value: string } | string;
  covers?: number[];
  created: { value: string };
  last_modified: { value: string };
  latest_revision: number;
  revision: number;
  authors: Array<{
    author: {
      key: string;
    };
  }>;
  key: string;
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

export interface BookDetails extends Book {
  description: string;
  created: string;
  lastModified: string;
  latestRevision: number;
  revision: number;
  authors: Author[];
}

export interface OpenLibraryAuthorResponse {
  name: string;
}

export type AdapterFunction<T, R> = (data: T) => R;
export type BuildUrlFunction = (apiUrl: string, searchQuery: string) => string;
