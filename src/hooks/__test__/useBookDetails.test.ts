import { BookDetails, OpenLibraryResponse } from "@/types";
import axios from "axios";
import { fetchBookDetails } from "../useBookDetails";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchBookDetails", () => {
  it("fetches book details successfully", async () => {
    const bookId = "OL12345W";
    const mockData: OpenLibraryResponse = {
      title: "Example Title",
      description: "Example Description",
      created: {
        value: "",
      },
      last_modified: {
        value: "",
      },
      latest_revision: 0,
      revision: 0,
      authors: [],
      key: "",
    };
    const expectedData: BookDetails = {
      title: "Example Title",
      description: "Example Description",
      created: "",
      lastModified: "",
      latestRevision: 0,
      revision: 0,
      authors: [],
      id: "",
      imgURL: "",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchBookDetails(bookId);

    expect(data).toEqual(expectedData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://openlibrary.org/works/${bookId}.json`
    );
  });

  it("handles errors correctly", async () => {
    const bookId = "OL12345W";
    const errorMessage = "Network Error";

    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchBookDetails(bookId)).rejects.toThrow(errorMessage);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://openlibrary.org/works/${bookId}.json`
    );
  });
});
