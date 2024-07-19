import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const commentSchema = z.object({
  name: z.string(),
  comment: z.string(),
});

type CommentInput = z.infer<typeof commentSchema>;

type CommentFormProps = {
  onSubmit: (data: CommentInput) => void;
};

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const form = useForm<CommentInput>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
  });

  const handleFormSubmit = (data: CommentInput) => {
    onSubmit(data);
    form.reset({
      name: "",
      comment: "",
    });
  };

  const name = form.watch("name");
  const comment = form.watch("comment");
  const isFormValid =
    form.formState.isValid && name.trim() !== "" && comment.trim() !== "";

  return (
    <div className="mx-auto w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                {form.formState.errors.name && (
                  <FormMessage>
                    {form.formState.errors.name.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Your comment" />
                </FormControl>
                {form.formState.errors.comment && (
                  <FormMessage>
                    {form.formState.errors.comment.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <Button type="submit" className="flex" disabled={!isFormValid}>
            Add Comment
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
