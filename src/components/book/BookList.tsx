import React from "react";
import { Book } from "@/types";

interface BookListProps {
  books: Book[];
  render: (book: Book) => React.ReactNode;
}

const BookList = ({ books, render }: BookListProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
      {books.map((book) => (
        <div key={book.id} className="w-[180px] shrink-0 grow-0">
          {render(book)}
        </div>
      ))}
    </div>
  );
};

export default BookList;
