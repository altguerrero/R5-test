import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NAVBAR_LINKS } from "@/constants";

const NavContent = () => {
  const location = useLocation();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {NAVBAR_LINKS.map((item) => {
        const isActive = location.pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              to={item.route}
              className={`${isActive && "rounded-lg bg-primary"} flex items-center justify-start gap-4 p-4`}
            >
              <img
                src={item.imgURl}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive && "invert"}`}
              />
              <p
                className={`${isActive && "font-bold text-white"} text-lg font-medium text-black `}
              >
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="p-6 sm:hidden">
          <Menu width={36} height={36} />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="border-none">
        <Link to="/" className="flex items-center gap-1">
          <img
            src="/assets/images/book-logo.svg"
            alt="book"
            width={32}
            height={32}
          />
          <p className="text-2xl font-bold text-primary">Books</p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
