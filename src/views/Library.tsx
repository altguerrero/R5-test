import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/utils";
import { BookDetails } from "@/types";
import BookLink from "@/components/book/BookLink";
import { BookContainer, BookList } from "@/components/book";
import { Title } from "@/components/shared/Title";

const Library = () => {
  const [favorites, setFavorites] = useState<BookDetails[]>([]);

  useEffect(() => {
    const favs = getFavorites();
    setFavorites(favs);
  }, []);

  return (
    <section>
      <Title>My Library</Title>
      <BookContainer>
        {favorites.length > 0 ? (
          <BookList
            books={favorites}
            render={(book) => <BookLink key={book.id} book={book} />}
          />
        ) : (
          <p>No books in your library.</p>
        )}
      </BookContainer>
    </section>
  );
};

export default Library;
