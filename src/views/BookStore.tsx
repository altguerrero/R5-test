import { BookContainer, BookList, BookSkeleton } from "@/components/book";
import BookLink from "@/components/book/BookLink";
import { GlobalSearch } from "@/components/shared/search";
import { useOpenLibrarySearch } from "@/hooks";

const BookStore = () => {
  const { data, isLoading, isError, handleSearch } =
    useOpenLibrarySearch("fiction");

  return (
    <section>
      <GlobalSearch title="Explore" onSearch={handleSearch} />
      {isLoading && (
        <BookContainer data-testid="loading-state">
          <BookList
            books={Array(10).fill({
              id: "",
              title: "",
              imgURL: "",
            })}
            render={() => <BookSkeleton data-testid="skeleton" />}
          />
        </BookContainer>
      )}
      {isError && <div data-testid="error-state">Error loading books.</div>}
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
