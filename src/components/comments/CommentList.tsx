import React from "react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface Comment {
  name: string;
  comment: string;
  avatarUrl: string;
}

type CommentListProps = {
  comments: Comment[];
};

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div>
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex w-full items-start space-x-4 rounded-md bg-gray-100 p-4 shadow-sm"
            >
              <Avatar>
                <AvatarImage src={comment.avatarUrl} alt={comment.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{comment.name}</p>
                <p className="overflow-hidden text-ellipsis break-words leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;
