import { useState, useEffect } from "react";

interface Comment {
  name: string;
  comment: string;
  avatarUrl: string;
}

const useComments = (bookId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const savedComments = JSON.parse(
      localStorage.getItem(`comments-${bookId}`) || "[]"
    );
    setComments(savedComments);
  }, [bookId]);

  const addComment = (comment: Omit<Comment, "avatarUrl">) => {
    const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${comment.name}`;
    const updatedComment: Comment = { ...comment, avatarUrl };
    const updatedComments = [...comments, updatedComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${bookId}`, JSON.stringify(updatedComments));
  };

  return {
    comments,
    addComment,
  };
};

export default useComments;
