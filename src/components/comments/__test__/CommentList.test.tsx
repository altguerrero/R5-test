import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentList from "../CommentList";

describe("CommentList", () => {
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

  it("renders correctly with comments", () => {
    render(<CommentList comments={mockComments} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a test comment.")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Another test comment.")).toBeInTheDocument();
  });

  it("renders correctly without comments", () => {
    render(<CommentList comments={[]} />);

    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
  });
});
