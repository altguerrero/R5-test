import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  isSearchFocused: boolean;
  className?: string;
}

const SearchInput = ({
  searchValue,
  setSearchValue,
  handleSearch,
  handleFocus,
  handleBlur,
  isSearchFocused,
  className,
}: SearchInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`${className} relative w-full max-w-[300px] leading-none`}>
      <div
        tabIndex={-1}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${isSearchFocused && "!border-primary bg-blue-100"} relative flex min-h-[56px] grow items-center gap-1 rounded-xl border-2 border-transparent bg-black/5 px-4 transition-colors`}
      >
        <Search
          width={24}
          height={24}
          className={`${isSearchFocused && "text-primary"} cursor-pointer transition-colors`}
          onClick={handleSearch}
        />
        <Input
          type="text"
          placeholder="Search a book"
          value={searchValue}
          className={`border-none bg-transparent text-base leading-none shadow-none outline-none placeholder:text-black/50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0`}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SearchInput;
