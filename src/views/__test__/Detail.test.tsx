import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Detail from "@/views/Detail";
import useBookDetails from "@/hooks/useBookDetails";

// Mock de useBookDetails
jest.mock("@/hooks/useBookDetails");

const mockedUseBookDetails = useBookDetails as jest.Mock;

describe("Detail view", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    mockedUseBookDetails.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("skeleton-title")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-image")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockedUseBookDetails.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Error loading book details.")).toBeInTheDocument();
  });

  it("renders book details and comments", () => {
    const mockBook = {
      id: "1",
      title: "Test Book",
      description: "This is a test book description.",
      authors: [
        {
          name: "Author 1",
          key: "1",
        },
      ],
    };

    mockedUseBookDetails.mockReturnValue({
      data: mockBook,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test book description.")
    ).toBeInTheDocument();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
  });
});
