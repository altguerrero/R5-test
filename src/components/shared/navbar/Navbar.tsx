import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVBAR_LINKS } from "@/constants";
import { NavbarLinks } from "@/types";
import MobileNav from "./MobileNav";

const NavList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="flex items-center gap-4 max-sm:hidden">{children}</ul>;
};

const NavItem = ({ route, label }: Pick<NavbarLinks, "route" | "label">) => {
  const location = useLocation();
  const isActive = location.pathname === route;

  return (
    <li className="block h-full px-4">
      <Link
        to={route}
        className={` ${isActive && "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-black hover:text-black"} 
          relative flex h-full items-center py-6 text-lg font-medium text-black hover:text-black/50 `}
      >
        {label}
      </Link>
    </li>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full border-b border-black/10 bg-soft-pink sm:px-12">
      <div className="container flex h-full justify-between gap-5">
        <Link to="/" className="flex items-center gap-1">
          <img
            src="/assets/images/book-logo.svg"
            alt="book"
            width={32}
            height={32}
          />
          <p className="text-2xl font-bold text-primary">Books</p>
        </Link>
        <div className="flex items-center">
          <NavList>
            {NAVBAR_LINKS.map((item) => (
              <NavItem key={item.route} route={item.route} label={item.label} />
            ))}
          </NavList>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
