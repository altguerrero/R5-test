import {
  adapterGoogleBooksApi,
  adapterOpenLibraryApi,
  buildUrlGoogleBooksApi,
  buildUrlOpenLibraryApi,
  adapterOpenLibraryDetails,
} from "../index";
import {
  GoogleBooksResponse,
  OpenLibraryResponse,
  OpenLibrarySearchResponse,
} from "@/types";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Adapters", () => {
  describe("adapterGoogleBooksApi", () => {
    it("should adapt Google Books API response to Book format", () => {
      const googleBooksResponse: GoogleBooksResponse = {
        items: [
          {
            id: "1",
            volumeInfo: {
              title: "Book Title",
              imageLinks: { thumbnail: "http://example.com/thumbnail.jpg" },
            },
          },
        ],
      };

      const result = adapterGoogleBooksApi(googleBooksResponse);
      expect(result).toEqual([
        {
          id: "1",
          title: "Book Title",
          imgURL: "http://example.com/thumbnail.jpg",
        },
      ]);
    });
  });

  describe("adapterOpenLibraryApi", () => {
    it("should adapt Open Library API search response to Book format", () => {
      const openLibrarySearchResponse: OpenLibrarySearchResponse = {
        docs: [
          {
            key: "/works/OL1234W",
            title: "Book Title",
            cover_i: 12345,
          },
        ],
      };

      const result = adapterOpenLibraryApi(openLibrarySearchResponse);
      expect(result).toEqual([
        {
          id: "OL1234W",
          title: "Book Title",
          imgURL: "https://covers.openlibrary.org/b/id/12345-M.jpg",
        },
      ]);
    });
  });

  describe("buildUrlGoogleBooksApi", () => {
    it("should build URL for Google Books API", () => {
      const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
      const searchQuery = "test";
      const result = buildUrlGoogleBooksApi(apiUrl, searchQuery);
      expect(result).toBe("https://www.googleapis.com/books/v1/volumes?q=test");
    });
  });

  describe("buildUrlOpenLibraryApi", () => {
    it("should build URL for Open Library API", () => {
      const apiUrl = "https://openlibrary.org/search.json";
      const searchQuery = "test";
      const result = buildUrlOpenLibraryApi(apiUrl, searchQuery);
      expect(result).toBe(
        "https://openlibrary.org/search.json?q=test&fields=key,title,cover_i&limit=21"
      );
    });
  });

  describe("adapterOpenLibraryDetails", () => {
    it("should adapt Open Library API details response to BookDetails format", async () => {
      const openLibraryResponse: OpenLibraryResponse = {
        title: "Book Title",
        description: { value: "Book Description" },
        covers: [12345],
        created: { value: "2023-07-18" },
        last_modified: { value: "2023-07-18" },
        latest_revision: 1,
        revision: 1,
        authors: [
          {
            author: { key: "/authors/OL1234A" },
          },
        ],
        key: "/works/OL1234W",
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          name: "Author Name",
        },
      });

      const result = await adapterOpenLibraryDetails(openLibraryResponse);
      expect(result).toEqual({
        id: "OL1234W",
        title: "Book Title",
        description: "Book Description",
        imgURL: "https://covers.openlibrary.org/b/id/12345-L.jpg",
        created: "2023-07-18",
        lastModified: "2023-07-18",
        latestRevision: 1,
        revision: 1,
        authors: [{ key: "/authors/OL1234A", name: "Author Name" }],
      });
    });
  });
});
