import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentForm from "../CommentForm";

describe("CommentForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<CommentForm onSubmit={mockOnSubmit} />);
  });

  it("renders form elements correctly", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add comment/i })
    ).toBeInTheDocument();
  });

  it("enables the submit button when form is valid", async () => {
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText(/comment/i), {
        target: { value: "This is a comment." },
      });
    });

    expect(
      screen.getByRole("button", { name: /add comment/i })
    ).not.toBeDisabled();
  });

  it("disables the submit button when form is invalid", () => {
    expect(screen.getByRole("button", { name: /add comment/i })).toBeDisabled();
  });
});
