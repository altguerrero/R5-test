import BookContainer from "@/components/book/BookContainer";
import BookSearch from "@/components/shared/search/BookSearch";
import BookList from "@/components/book/BookList";
import BookCard from "@/components/book/BookCard";
import useGoogleBookSearch from "@/hooks/useGoogleBookSearch";

const Home = () => {
  const { data, handleSearch } = useGoogleBookSearch("js");

  return (
    <section>
      <BookSearch title="Discover" onSearch={handleSearch} />
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
