import { useParams } from "react-router-dom";
import useBookDetails from "@/hooks/useBookDetails";
import { BookDetail, BookDetailSkeleton } from "@/components/book";

const Detail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useBookDetails(id);

  if (isLoading) {
    return <BookDetailSkeleton />;
  }

  if (isError) {
    return <div>Error loading book details.</div>;
  }

  return <BookDetail book={book} />;
};

export default Detail;
