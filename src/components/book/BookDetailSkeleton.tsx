import { Skeleton } from "../ui/skeleton";

const BookDetailSkeleton = () => {
  return (
    <section className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Skeleton className=" h-8 w-24 bg-gray-300" />
        <Skeleton className=" size-8 bg-gray-300" />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="flex items-center justify-center lg:items-start">
          <Skeleton className="h-[220px] min-w-[150px] max-w-[150px] rounded-xl bg-gray-300 object-cover lg:h-[500px] lg:min-w-[336px] lg:max-w-[336px]" />
        </div>
        <div className="flex flex-col">
          <div className="mb-2 flex w-full items-center justify-center gap-4 lg:mb-16 lg:justify-between">
            <Skeleton className=" h-8 w-48 bg-gray-300 lg:h-12 lg:w-96" />
            <Skeleton className=" size-8 bg-gray-300 max-lg:hidden" />
          </div>
          <ul className="mb-5 flex justify-center gap-4 lg:justify-start">
            <Skeleton className=" h-6 w-24 bg-gray-300 lg:h-8 lg:w-48" />
            <Skeleton className=" h-6 w-24 bg-gray-300 lg:h-8 lg:w-48" />
          </ul>
          <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Skeleton className=" h-6 w-32 bg-gray-300 lg:h-8 lg:w-48" />
            <Skeleton className=" h-6 w-32 bg-gray-300 lg:h-8 lg:w-48" />
            <Skeleton className=" h-6 w-32 bg-gray-300 lg:h-8 lg:w-48" />
            <Skeleton className=" h-6 w-32 bg-gray-300 lg:h-8 lg:w-48" />
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-black lg:text-2xl">
              What's inside
            </h2>
            <Skeleton className=" h-4 w-full bg-gray-300 lg:h-6 lg:w-full" />
            <Skeleton className=" mt-2 h-4 w-full bg-gray-300 lg:h-6 lg:w-full" />
            <Skeleton className=" mt-2 h-4 w-full bg-gray-300 lg:h-6 lg:w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default BookDetailSkeleton;
