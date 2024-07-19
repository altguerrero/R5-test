import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookLink from "../BookLink";
import { Book } from "@/types";

const mockBook: Book = {
  id: "1",
  title: "Test Book",
  imgURL: "https://example.com/book.jpg",
};

jest.mock("../BookCard", () => {
  return ({ title, imgURL }: Book) => (
    <div>
      <img src={imgURL} alt={title} />
      <p>{title}</p>
    </div>
  );
});

describe("BookLink", () => {
  it("renders correctly and forms the correct link", () => {
    render(
      <MemoryRouter>
        <BookLink book={mockBook} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/bookstore/1/test-book");
  });

  it("passes the correct props to BookCard", () => {
    render(
      <MemoryRouter>
        <BookLink book={mockBook} />
      </MemoryRouter>
    );

    const imgElement = screen.getByRole("img");
    const titleElement = screen.getByText("Test Book");

    expect(imgElement).toHaveAttribute("src", "https://example.com/book.jpg");
    expect(imgElement).toHaveAttribute("alt", "Test Book");
    expect(titleElement).toBeInTheDocument();
  });
});
