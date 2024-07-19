import {
  cn,
  formatDate,
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../utils";
import { BookDetails } from "@/types";

describe("Utility Functions", () => {
  describe("cn", () => {
    it("combines class names", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("merges tailwind classes correctly", () => {
      expect(cn("p-2", "p-4")).toBe("p-4");
    });
  });

  describe("formatDate", () => {
    it("returns formatted date for valid date string", () => {
      const date = new Date("2023-07-17T00:00:00Z");
      expect(formatDate(date.toISOString())).toBe("July 16, 2023");
    });

    it("returns 'N/A' for empty date string", () => {
      expect(formatDate("")).toBe("N/A");
    });

    it("returns 'Invalid Date' for invalid date string", () => {
      expect(formatDate("invalid-date")).toBe("Invalid Date");
    });
  });

  describe("Favorites functions", () => {
    const book: BookDetails = {
      id: "1",
      title: "Test Book",
      imgURL: "test-url",
      description: "Test Description",
      created: "2023-07-18",
      lastModified: "2023-07-18",
      latestRevision: 1,
      revision: 1,
      authors: [{ key: "A1", name: "Author 1" }],
    };

    beforeEach(() => {
      localStorage.clear();
    });

    describe("getFavorites", () => {
      it("returns an empty array if no favorites", () => {
        expect(getFavorites()).toEqual([]);
      });

      it("returns favorites from localStorage", () => {
        localStorage.setItem("favorites", JSON.stringify([book]));
        expect(getFavorites()).toEqual([book]);
      });
    });

    describe("addFavorite", () => {
      it("adds a book to favorites", () => {
        addFavorite(book);
        expect(getFavorites()).toEqual([book]);
      });
    });

    describe("removeFavorite", () => {
      it("removes a book from favorites", () => {
        addFavorite(book);
        removeFavorite(book.id);
        expect(getFavorites()).toEqual([]);
      });
    });

    describe("isFavorite", () => {
      it("returns true if book is in favorites", () => {
        addFavorite(book);
        expect(isFavorite(book.id)).toBe(true);
      });

      it("returns false if book is not in favorites", () => {
        expect(isFavorite(book.id)).toBe(false);
      });
    });
  });
});
