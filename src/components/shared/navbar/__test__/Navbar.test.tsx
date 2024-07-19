import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import Navbar from "../Navbar";
import { NAVBAR_LINKS } from "@/constants";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({ pathname: "/" }),
}));

describe("Navbar", () => {
  it("renders the logo with correct attributes", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const logo = screen.getByAltText("book");
    expect(logo).toHaveAttribute("src", "/assets/images/book-logo.svg");
    expect(logo).toHaveAttribute("width", "32");
    expect(logo).toHaveAttribute("height", "32");
  });

  it("renders navigation links correctly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    NAVBAR_LINKS.forEach((link) => {
      const navLink = screen.getByText(link.label).closest("a");
      expect(navLink).toHaveAttribute("href", link.route);
    });
  });

  it("highlights the active link based on the current location", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const activeLink = screen.getByText(NAVBAR_LINKS[0].label).closest("a");
    expect(activeLink).toHaveClass(
      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-black hover:text-black"
    );
  });

  it("renders MobileNav component", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();
  });
});
