import BookCard from "./BookCard";
import BookList from "./BookList";
import { FAKE_BOOKS } from "@/constants";

const BookContainer = () => {
  return (
    <section className="pt-16">
      <BookList books={FAKE_BOOKS} render={(book) => <BookCard {...book} />} />
    </section>
  );
};

export default BookContainer;
