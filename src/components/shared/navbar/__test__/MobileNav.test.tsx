import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MobileNav from "../MobileNav";
import { NAVBAR_LINKS } from "@/constants";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({ pathname: "/" }),
}));

describe("MobileNav", () => {
  it("renders menu button and opens sheet on click", () => {
    render(
      <Router>
        <MobileNav />
      </Router>
    );

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);

    NAVBAR_LINKS.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it("renders the logo with correct attributes", () => {
    render(
      <Router>
        <MobileNav />
      </Router>
    );

    fireEvent.click(screen.getByRole("button"));

    const logo = screen.getByAltText("book");
    expect(logo).toHaveAttribute("src", "/assets/images/book-logo.svg");
    expect(logo).toHaveAttribute("width", "32");
    expect(logo).toHaveAttribute("height", "32");
  });
});
