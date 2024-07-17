import { Book, NavbarLinks } from "@/types";

export const NAVBAR_LINKS: NavbarLinks[] = [
  {
    imgULR: "/assets/icons/discover.svg",
    route: "/",
    label: "Discover",
  },
  {
    imgULR: "/assets/icons/book.svg",
    route: "/bookstore",
    label: "Store",
  },
  {
    imgULR: "/assets/icons/library.svg",
    route: "/library",
    label: "Library",
  },
];

export const FAKE_BOOKS: Book[] = [
  {
    id: 1,
    title: "Book Title 1",
    imgURL: "https://via.placeholder.com/180x270",
  },
  {
    id: 2,
    title: "Book Title 2",
    imgURL: "https://via.placeholder.com/180x270",
  },
  {
    id: 3,
    title: "Book Title 3",
    imgURL: "https://via.placeholder.com/180x270",
  },
  {
    id: 4,
    title: "Book Title 4",
    imgURL: "https://via.placeholder.com/180x270",
  },
  {
    id: 5,
    title: "Book Title 5",
    imgURL: "https://via.placeholder.com/180x270",
  },
  {
    id: 6,
    title: "Book Title 6",
    imgURL: "https://via.placeholder.com/180x270",
  },
  {
    id: 7,
    title: "Book Title 7",
    imgURL: "https://via.placeholder.com/180x270",
  },
  {
    id: 8,
    title: "Book Title 8",
    imgURL: "https://via.placeholder.com/180x270",
  },
];
