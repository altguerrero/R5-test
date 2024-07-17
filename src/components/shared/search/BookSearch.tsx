import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { Search, X } from "lucide-react";

interface BookSearchProps {
  title: string;
  onSearch: (searchValue: string) => void;
}

const BookSearch = ({ title, onSearch }: BookSearchProps) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleFocus = () => setIsSearchFocused(true);
  const handleBlur = () => setIsSearchFocused(false);

  const handleSearch = () => onSearch(searchValue);

  const handleToggleSearch = () => setIsSearchActive(!isSearchActive);

  return (
    <section className="flex min-h-[56px] items-center justify-between gap-4">
      <div>
        <h1
          className={`${isSearchActive && "max-lg:hidden"} text-3xl font-bold lg:text-6xl`}
        >
          {title}
        </h1>
        <SearchInput
          className={`lg:hidden ${!isSearchActive && "hidden"}`}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isSearchFocused={isSearchFocused}
        />
      </div>
      <SearchInput
        className="max-lg:hidden"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isSearchFocused={isSearchFocused}
      />
      <div className="lg:hidden">
        <Search
          width={24}
          height={24}
          className={`${isSearchActive && "hidden"} cursor-pointer`}
          onClick={handleToggleSearch}
        />
        <X
          width={24}
          height={24}
          className={`${!isSearchActive && "hidden"} cursor-pointer`}
          onClick={handleToggleSearch}
        />
      </div>
    </section>
  );
};

export default BookSearch;
