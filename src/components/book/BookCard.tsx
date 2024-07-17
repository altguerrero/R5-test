import { Book } from "@/types";

const BookCard = ({ id, imgURL, title }: Book) => {
  return (
    <figure
      data-id={id}
      className="flex w-full min-w-[180px] max-w-[180px] flex-col"
    >
      <img
        src={imgURL}
        alt={title}
        className="mb-4 block h-[270px] w-full rounded-lg object-cover"
        loading="lazy"
      />
      <figcaption
        className="text-base font-normal"
        aria-label={`Book title: ${title}`}
      >
        {title}
      </figcaption>
    </figure>
  );
};

export default BookCard;
