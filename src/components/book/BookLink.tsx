import { Link } from "react-router-dom";
import { Book } from "@/types";
import BookCard from "./BookCard";

interface BookLinkProps {
  book: Book;
}

const BookLink = ({ book }: BookLinkProps) => {
  const title = book.title.split(" ").join("-").toLowerCase();

  return (
    <Link to={`/bookstore/${book.id}/${title}`}>
      <BookCard {...book} />
    </Link>
  );
};

export default BookLink;
