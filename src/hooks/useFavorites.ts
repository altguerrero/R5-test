import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/utils";
import { BookDetails } from "@/types";
import { toast } from "@/components/ui/use-toast";

const useFavorites = (bookId: string, book?: BookDetails) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (bookId) {
      setIsFav(isFavorite(bookId));
    }
  }, [bookId]);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(bookId);
      toast({
        duration: 1500,
        variant: "info",
        title: "Removed from favorites!",
      });
    } else if (book) {
      addFavorite(book);
      toast({
        duration: 1500,
        variant: "success",
        title: "Added to favorites!",
      });
    }
    setIsFav(!isFav);
  };

  return { isFav, toggleFavorite };
};

export default useFavorites;
