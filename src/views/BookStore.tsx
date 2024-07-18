import { BookContainer, BookList, BookSkeleton } from "@/components/book";
import BookLink from "@/components/book/BookLink";
import { GlobalSearch } from "@/components/shared/search";
import { useOpenLibrarySearch } from "@/hooks";

const BookStore = () => {
  const { data, isLoading, handleSearch } = useOpenLibrarySearch("fiction");

  return (
    <section>
      <GlobalSearch title="Explore" onSearch={handleSearch} />
      {isLoading && (
        <BookContainer>
          <BookList
            books={Array(10).fill({
              id: "",
              title: "",
              imgURL: "",
            })}
            render={() => <BookSkeleton />}
          />
        </BookContainer>
      )}
      {data && (
        <BookContainer>
          <BookList
            books={data}
            render={(book) => <BookLink key={book.id} book={book} />}
          />
        </BookContainer>
      )}
    </section>
  );
};

export default BookStore;
