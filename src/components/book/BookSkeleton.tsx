import { Skeleton } from "../ui/skeleton";

const BookSkeleton = () => {
  return (
    <div className="flex w-full min-w-[180px] max-w-[180px] flex-col ">
      <Skeleton className="mb-4 h-[270px] w-full rounded-lg bg-gray-300" />
      <Skeleton className="h-4 w-3/4 rounded bg-gray-300" />
    </div>
  );
};

export default BookSkeleton;
