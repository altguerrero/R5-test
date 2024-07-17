export interface NavbarLinks {
  imgULR: string;
  route: string;
  label: string;
}

export interface Book {
  id: string;
  title: string;
  imgURL: string;
}

export interface GoogleBooksVolume {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export interface GoogleBooksResponse {
  items: GoogleBooksVolume[];
}

export type AdapterFunction = (data: GoogleBooksResponse) => Book[];

export type BuildUrlFunction = (apiUrl: string, searchQuery: string) => string;
