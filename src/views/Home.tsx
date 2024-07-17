import BookContainer from "@/components/book/BookContainer";
import BookSearch from "@/components/shared/search/BookSearch";

const Home = () => {
  const handleSearch = (search: string) => {
    console.log("search:", search);
  };

  return (
    <section>
      <BookSearch title="Discover" onSearch={handleSearch} />
      <BookContainer />
    </section>
  );
};

export default Home;
