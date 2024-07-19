import { renderHook, act } from "@testing-library/react";
import useFavorites from "../useFavorites";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { BookDetails } from "@/types";

jest.mock("@/lib/utils");
jest.mock("@/components/ui/use-toast");

describe("useFavorites", () => {
  const mockBook: BookDetails = {
    title: "Example Book",
    description: "Example Description",
    created: "2022-01-01",
    lastModified: "2022-01-02",
    latestRevision: 1,
    revision: 1,
    authors: [
      {
        name: "Author Name",
        key: "",
      },
    ],
    id: "book1",
    imgURL: "http://example.com/image.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with correct favorite state", () => {
    (isFavorite as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useFavorites("book1"));

    expect(result.current.isFav).toBe(true);
    expect(isFavorite).toHaveBeenCalledWith("book1");
  });

  it("toggles favorite state and calls appropriate functions", () => {
    (isFavorite as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useFavorites("book1", mockBook));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(addFavorite).toHaveBeenCalledWith(mockBook);
    expect(toast).toHaveBeenCalledWith({
      duration: 1500,
      variant: "success",
      title: "Added to favorites!",
    });
    expect(result.current.isFav).toBe(true);

    act(() => {
      result.current.toggleFavorite();
    });

    expect(removeFavorite).toHaveBeenCalledWith("book1");
    expect(toast).toHaveBeenCalledWith({
      duration: 1500,
      variant: "info",
      title: "Removed from favorites!",
    });
    expect(result.current.isFav).toBe(false);
  });
});
