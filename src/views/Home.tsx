import {
  BookCard,
  BookContainer,
  BookList,
  BookSkeleton,
} from "@/components/book";
import { GlobalSearch } from "@/components/shared/search";
import { useGoogleBookSearch } from "@/hooks";

const Home = () => {
  const { data, isLoading, handleSearch } = useGoogleBookSearch("js");

  return (
    <section>
      <GlobalSearch title="Discover" onSearch={handleSearch} />
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
            render={(book) => <BookCard key={book.id} {...book} />}
          />
        </BookContainer>
      )}
    </section>
  );
};

export default Home;
