import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import BookDetail from "../BookDetail";
import { BookDetails } from "@/types";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("@/hooks", () => ({
  useFavorites: jest.fn().mockReturnValue({
    isFav: false,
    toggleFavorite: jest.fn(),
  }),
}));

const book: BookDetails = {
  id: "1",
  title: "Test Book",
  imgURL: "https://example.com/book.jpg",
  description: "This is a test book description.",
  authors: [
    { key: "1", name: "Author One" },
    { key: "2", name: "Author Two" },
  ],
  created: "2023-01-01T00:00:00Z",
  lastModified: "2023-05-31T00:00:00Z",
  latestRevision: 2,
  revision: 5,
};

describe("BookDetail", () => {
  it("renders book details correctly", () => {
    render(
      <Router>
        <BookDetail book={book} />
      </Router>
    );

    expect(screen.getByText("Test Book")).toBeInTheDocument();

    expect(screen.getByText("Author One")).toBeInTheDocument();
    expect(screen.getByText("Author Two")).toBeInTheDocument();

    expect(
      screen.getByText("This is a test book description.")
    ).toBeInTheDocument();
  });

  it("handles 'Go back' button click correctly", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <Router>
        <BookDetail book={book} />
      </Router>
    );

    fireEvent.click(screen.getByText("Go back"));

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
