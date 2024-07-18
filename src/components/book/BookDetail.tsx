import React from "react";
import { BookDetails } from "@/types";
import { Button } from "../ui/button";
import { Bookmark, Edit, Clock, Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import { useFavorites } from "@/hooks";

interface BookDetailProps {
  book: BookDetails | undefined;
}

const BookDetail = ({ book }: BookDetailProps) => {
  const { isFav, toggleFavorite } = useFavorites(book?.id ?? "", book);

  if (!book) {
    return null;
  }

  return (
    <section className="container mx-auto p-4">
      <BookGoBack isFav={isFav} onBookmarkClick={toggleFavorite} />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <BookImage book={book} />
        <BookInfo book={book} isFav={isFav} onBookmarkClick={toggleFavorite} />
      </div>
    </section>
  );
};

export default BookDetail;

const BookGoBack = ({
  isFav,
  onBookmarkClick,
}: {
  isFav: boolean;
  onBookmarkClick: () => void;
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="mb-6 flex items-center justify-between lg:hidden">
      <div
        onClick={handleBackClick}
        className="flex cursor-pointer items-center gap-2"
      >
        <ArrowLeft />
        <span className="text-xl font-bold">Go back</span>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="bg-black/5 hover:bg-black/5 lg:hidden"
        onClick={onBookmarkClick}
      >
        <Bookmark className={`${isFav && "fill-black"} size-5`} />
      </Button>
    </div>
  );
};

const BookImage = ({ book }: { book: BookDetails }) => {
  const { title, imgURL } = book;

  return (
    <div className="flex items-center justify-center lg:items-start">
      <img
        src={imgURL}
        alt={title}
        className="block min-w-[150px] max-w-[150px] rounded-xl object-cover lg:min-w-[336px] lg:max-w-[336px]"
      />
    </div>
  );
};

const BookTitle = ({
  title,
  isFav,
  onBookmarkClick,
}: {
  title: string;
  isFav: boolean;
  onBookmarkClick: () => void;
}) => {
  return (
    <div className="mb-2 flex w-full items-center justify-center gap-4 lg:mb-16 lg:justify-between">
      <h1 className="text-2xl font-bold lg:text-5xl">{title}</h1>
      <Button
        variant="outline"
        size="icon"
        className="bg-black/5 hover:bg-black/5 max-lg:hidden"
        onClick={onBookmarkClick}
      >
        <Bookmark className={`${isFav && "fill-black"} size-5`} />
      </Button>
    </div>
  );
};

const BookInfo = ({
  book,
  isFav,
  onBookmarkClick,
}: {
  book: BookDetails;
  isFav: boolean;
  onBookmarkClick: () => void;
}) => {
  const {
    title,
    description,
    authors,
    created,
    lastModified,
    latestRevision,
    revision,
  } = book;

  return (
    <div className="flex flex-col">
      <BookTitle
        title={title}
        isFav={isFav}
        onBookmarkClick={onBookmarkClick}
      />
      <BookAuthors authors={authors} />
      <BookDates
        created={created}
        lastModified={lastModified}
        latestRevision={latestRevision}
        revision={revision}
      />
      <BookDescription description={description} />
    </div>
  );
};

const BookAuthors = ({
  authors,
}: {
  authors: { key: string; name: string }[];
}) => (
  <ul className="mb-5 flex justify-center gap-4 lg:justify-start">
    {authors.map((author) => (
      <li
        key={author.key}
        className="text-sm font-normal text-black/40 lg:text-lg"
      >
        {author.name}
      </li>
    ))}
  </ul>
);

const BookDates = ({
  created,
  lastModified,
  latestRevision,
  revision,
}: {
  created: string;
  lastModified: string;
  latestRevision: number;
  revision: number;
}) => (
  <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
    <BookDateItem
      icon={<Calendar className="mr-2 inline-block" />}
      label="Created"
      date={created}
    />
    <BookDateItem
      icon={<Clock className="mr-2 inline-block" />}
      label="Last Modified"
      date={lastModified}
    />
    <BookDateItem
      icon={<Edit className="mr-2 inline-block" />}
      label="Latest Revision"
      date={String(latestRevision)}
    />
    <BookDateItem
      icon={<Edit className="mr-2 inline-block" />}
      label="Revision"
      date={String(revision)}
    />
  </div>
);

const BookDateItem = ({
  icon,
  label,
  date,
}: {
  icon: React.ReactNode;
  label: string;
  date: string;
}) => (
  <p className="flex flex-wrap items-center gap-2 text-sm lg:text-lg">
    <strong className="flex items-center gap-0.5 text-sm lg:text-lg">
      {icon}
      {label}:
    </strong>
    {formatDate(date)}
  </p>
);

const BookDescription = ({ description }: { description: string }) => (
  <div>
    <h2 className="mb-4 text-xl font-bold text-black lg:text-2xl">
      What's inside
    </h2>
    <p className="break-words text-base font-normal leading-relaxed text-black lg:text-lg">
      {description}
    </p>
  </div>
);
