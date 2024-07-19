import { render, screen } from "@testing-library/react";
import BookList from "../BookList";
import { Book } from "@/types";

const mockBooks: Book[] = [
  {
    id: "1",
    title: "Test Book 1",
    imgURL: "https://example.com/book1.jpg",
  },
  {
    id: "2",
    title: "Test Book 2",
    imgURL: "https://example.com/book2.jpg",
  },
];

describe("BookList", () => {
  it("renders correctly with provided books", () => {
    render(
      <BookList
        books={mockBooks}
        render={(book) => (
          <div data-testid={`book-${book.id}`}>
            <img src={book.imgURL} alt={book.title} />
            <p>{book.title}</p>
          </div>
        )}
      />
    );

    const book1 = screen.getByTestId("book-1");
    const book2 = screen.getByTestId("book-2");

    expect(book1).toBeInTheDocument();
    expect(book2).toBeInTheDocument();

    const book1Title = screen.getByText("Test Book 1");
    const book2Title = screen.getByText("Test Book 2");

    expect(book1Title).toBeInTheDocument();
    expect(book2Title).toBeInTheDocument();

    const book1Img = screen.getByAltText("Test Book 1");
    const book2Img = screen.getByAltText("Test Book 2");

    expect(book1Img).toHaveAttribute("src", "https://example.com/book1.jpg");
    expect(book2Img).toHaveAttribute("src", "https://example.com/book2.jpg");
  });

  it("calls render function with correct books", () => {
    const renderFn = jest.fn((book: Book) => (
      <div data-testid={`book-${book.id}`}>
        <img src={book.imgURL} alt={book.title} />
        <p>{book.title}</p>
      </div>
    ));

    render(<BookList books={mockBooks} render={renderFn} />);

    expect(renderFn).toHaveBeenCalledTimes(mockBooks.length);
    mockBooks.forEach((book, index) => {
      expect(renderFn).toHaveBeenNthCalledWith(index + 1, book);
    });
  });
});
