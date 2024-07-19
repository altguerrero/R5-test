import { useComments } from "@/hooks";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type CommentsProps = {
  bookId: string;
};

const Comments = ({ bookId }: CommentsProps) => {
  const { comments, addComment } = useComments(bookId);

  const handleAddComment = (data: { name: string; comment: string }) => {
    addComment(data);
  };

  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-black lg:text-2xl">
        Comments
      </h2>
      <div className="flex flex-col gap-16">
        <CommentForm onSubmit={handleAddComment} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default Comments;
