import { FAVORITES_KEY } from "@/constants";
import { BookDetails } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), "MMMM dd, yyyy");
  } catch {
    return "Invalid Date";
  }
};

export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (book: BookDetails) => {
  const favorites = getFavorites();
  favorites.push(book);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const removeFavorite = (bookId: string) => {
  let favorites = getFavorites();
  favorites = favorites.filter((book: BookDetails) => book.id !== bookId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (bookId: string) => {
  const favorites = getFavorites();
  return favorites.some((book: BookDetails) => book.id === bookId);
};
