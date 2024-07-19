import { render, fireEvent, waitFor } from "@testing-library/react";
import useComments from "../useComments";

const TestComponent = ({ bookId }: { bookId: string }) => {
  const { comments, addComment } = useComments(bookId);

  return (
    <div>
      <ul data-testid="comments-list">
        {comments.map((comment, index) => (
          <li key={index}>{comment.comment}</li>
        ))}
      </ul>
      <button
        onClick={() =>
          addComment({ name: "Test User", comment: "Test Comment" })
        }
      >
        Add Comment
      </button>
    </div>
  );
};

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useComments", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should load comments from localStorage", () => {
    const bookId = "testBook";
    const savedComments = [
      { name: "John", comment: "Great book!", avatarUrl: "url1" },
      { name: "Jane", comment: "Loved it!", avatarUrl: "url2" },
    ];
    localStorage.setItem(`comments-${bookId}`, JSON.stringify(savedComments));

    const { getByTestId } = render(<TestComponent bookId={bookId} />);
    const commentsList = getByTestId("comments-list");

    expect(commentsList.children.length).toBe(2);
    expect(commentsList).toHaveTextContent("Great book!");
    expect(commentsList).toHaveTextContent("Loved it!");
  });

  it("should add a new comment", async () => {
    const bookId = "testBook";

    const { getByText, getByTestId } = render(
      <TestComponent bookId={bookId} />
    );
    const commentsList = getByTestId("comments-list");
    const addButton = getByText("Add Comment");

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(commentsList.children.length).toBe(1);
      expect(commentsList).toHaveTextContent("Test Comment");
    });

    const storedComments = JSON.parse(
      localStorage.getItem(`comments-${bookId}`) ?? ""
    );
    expect(storedComments.length).toBe(1);
    expect(storedComments[0].comment).toBe("Test Comment");
  });

  it("should persist comments to localStorage", async () => {
    const bookId = "testBook";

    const { getByText, getByTestId } = render(
      <TestComponent bookId={bookId} />
    );
    const commentsList = getByTestId("comments-list");
    const addButton = getByText("Add Comment");

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(commentsList.children.length).toBe(1);
      expect(commentsList).toHaveTextContent("Test Comment");
    });

    const storedComments = JSON.parse(
      localStorage.getItem(`comments-${bookId}`) ?? ""
    );
    expect(storedComments.length).toBe(1);
    expect(storedComments[0].comment).toBe("Test Comment");
  });
});
