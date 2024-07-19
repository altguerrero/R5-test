import { useParams } from "react-router-dom";
import useBookDetails from "@/hooks/useBookDetails";
import { BookDetail, BookDetailSkeleton } from "@/components/book";
import { Comments } from "@/components/comments";

const Detail = () => {
  const { id = "" } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useBookDetails(id);

  if (isLoading) {
    return <BookDetailSkeleton />;
  }

  if (isError) {
    return <div>Error loading book details.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <BookDetail book={book} />
      <Comments bookId={id} />
    </div>
  );
};

export default Detail;
