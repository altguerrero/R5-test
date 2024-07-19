import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Comments from "../Comments";
import { useComments } from "@/hooks";

jest.mock("@/hooks");

const mockUseComments = useComments as jest.MockedFunction<typeof useComments>;

describe("Comments", () => {
  const bookId = "1";
  const mockComments = [
    {
      name: "John Doe",
      comment: "This is a test comment.",
      avatarUrl: "https://example.com/avatar1.jpg",
    },
    {
      name: "Jane Smith",
      comment: "Another test comment.",
      avatarUrl: "https://example.com/avatar2.jpg",
    },
  ];

  beforeEach(() => {
    mockUseComments.mockReturnValue({
      comments: mockComments,
      addComment: jest.fn(),
    });
  });

  it("renders comments correctly", () => {
    render(<Comments bookId={bookId} />);

    expect(screen.getByText("Comments")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a test comment.")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Another test comment.")).toBeInTheDocument();
  });

  it("displays 'No comments yet.' when there are no comments", () => {
    mockUseComments.mockReturnValueOnce({
      comments: [],
      addComment: jest.fn(),
    });

    render(<Comments bookId={bookId} />);

    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
  });
});
