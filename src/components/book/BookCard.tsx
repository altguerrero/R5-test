import { Book } from "@/types";

const BookCard = ({ id, imgURL, title }: Book) => {
  const defaultImgURL = "https://via.placeholder.com/180x270";
  const truncatedTitle =
    title.length > 40 ? `${title.substring(0, 40)}...` : title;

  return (
    <figure
      data-id={id}
      className="flex w-full min-w-[180px] max-w-[180px] flex-col"
      title={title}
    >
      <img
        src={imgURL || defaultImgURL}
        alt={title}
        className="mb-4 block h-[270px] w-full rounded-lg object-cover"
        loading="lazy"
      />
      <figcaption
        className="text-base font-normal"
        aria-label={`Book title: ${title}`}
      >
        {truncatedTitle}
      </figcaption>
    </figure>
  );
};

export default BookCard;
