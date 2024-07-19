import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Importa el enrutador
import Library from "@/views/Library";
import { getFavorites } from "@/lib/utils";
import { BookDetails } from "@/types";

jest.mock("@/lib/utils");

const mockedGetFavorites = getFavorites as jest.Mock;

describe("Library view", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the list of favorite books", () => {
    const mockFavorites: BookDetails[] = [
      {
        id: "1",
        title: "Favorite Book 1",
        imgURL: "",
        authors: [
          {
            name: "Author 1",
            key: "",
          },
        ],
        description: "",
        created: "",
        lastModified: "",
        latestRevision: 0,
        revision: 0,
      },
      {
        id: "2",
        title: "Favorite Book 2",
        imgURL: "",
        authors: [
          {
            name: "Author 2",
            key: "",
          },
        ],
        description: "",
        created: "",
        lastModified: "",
        latestRevision: 0,
        revision: 0,
      },
    ];

    mockedGetFavorites.mockReturnValue(mockFavorites);

    render(
      <BrowserRouter>
        <Library />
      </BrowserRouter>
    ); // Envolver en BrowserRouter

    expect(screen.getByText("My Library")).toBeInTheDocument();
    expect(screen.getByText("Favorite Book 1")).toBeInTheDocument();
    expect(screen.getByText("Favorite Book 2")).toBeInTheDocument();
  });

  it("renders a message when there are no favorite books", () => {
    mockedGetFavorites.mockReturnValue([]);

    render(
      <BrowserRouter>
        <Library />
      </BrowserRouter>
    ); // Envolver en BrowserRouter

    expect(screen.getByText("My Library")).toBeInTheDocument();
    expect(screen.getByText("No books in your library.")).toBeInTheDocument();
  });
});
