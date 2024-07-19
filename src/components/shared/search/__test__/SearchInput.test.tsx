import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "../SearchInput";

describe("SearchInput", () => {
  const mockSetSearchValue = jest.fn();
  const mockHandleSearch = jest.fn();
  const mockHandleFocus = jest.fn();
  const mockHandleBlur = jest.fn();

  const defaultProps = {
    searchValue: "",
    setSearchValue: mockSetSearchValue,
    handleSearch: mockHandleSearch,
    handleFocus: mockHandleFocus,
    handleBlur: mockHandleBlur,
    isSearchFocused: false,
    className: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls setSearchValue on input change", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search a book");
    fireEvent.change(input, { target: { value: "new search value" } });

    expect(mockSetSearchValue).toHaveBeenCalledWith("new search value");
  });

  it("calls handleSearch on Enter key press", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search a book");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it("calls handleFocus on input focus", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search a book");
    fireEvent.focus(input);

    expect(mockHandleFocus).toHaveBeenCalled();
  });

  it("calls handleBlur on input blur", () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search a book");
    fireEvent.blur(input);

    expect(mockHandleBlur).toHaveBeenCalled();
  });

  it("applies focused styles when isSearchFocused is true", () => {
    render(<SearchInput {...defaultProps} isSearchFocused={true} />);

    const container = screen.getByRole("textbox").parentElement;
    expect(container).toHaveClass("!border-primary bg-blue-100");
  });
});
