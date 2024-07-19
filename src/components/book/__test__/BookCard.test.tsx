import { render, screen } from "@testing-library/react";
import BookCard from "../BookCard";
import { Book } from "@/types";

const mockBook: Book = {
  id: "1",
  title: "A very long book title that exceeds forty characters",
  imgURL: "https://example.com/book.jpg",
};

const mockBookWithoutImage: Book = {
  id: "2",
  title: "A short title",
  imgURL: "",
};

describe("BookCard", () => {
  it("renders correctly with provided props", () => {
    render(<BookCard {...mockBook} />);

    const figure = screen.getByRole("figure");
    expect(figure).toHaveAttribute("data-id", mockBook.id);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockBook.imgURL);
    expect(img).toHaveAttribute("alt", mockBook.title);

    const figcaption = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.tagName.toLowerCase() === "figcaption" &&
        content.startsWith("A very long book title that exceeds f")
      );
    });
    expect(figcaption).toBeInTheDocument();
  });

  it("uses default image URL if imgURL is not provided", () => {
    render(<BookCard {...mockBookWithoutImage} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://via.placeholder.com/180x270");
  });

  it("renders full title if it is shorter than or equal to 40 characters", () => {
    const shortTitleBook: Book = {
      id: "3",
      title: "A short title",
      imgURL: "https://example.com/book.jpg",
    };

    render(<BookCard {...shortTitleBook} />);

    const figcaption = screen.getByText(shortTitleBook.title);
    expect(figcaption).toBeInTheDocument();
  });
});
