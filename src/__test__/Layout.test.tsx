import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from "@/Layout";

describe("Layout Component", () => {
  it("renders the Navbar and Outlet correctly", () => {
    const MockComponent = () => <div>Mock Content</div>;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MockComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByText("Mock Content")).toBeInTheDocument();
  });
});
