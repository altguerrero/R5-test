import { useState } from "react";
import SearchInput from "./SearchInput";
import { Search, X } from "lucide-react";
import { Title } from "../Title";

interface GlobalSearchProps {
  title: string;
  onSearch: (searchValue: string) => void;
}

const GlobalSearch = ({ title, onSearch }: GlobalSearchProps) => {
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
        <Title className={`${isSearchActive && "max-lg:hidden"}`}>
          {title}
        </Title>
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
          role="button"
          aria-label="search"
          className={`${isSearchActive && "hidden"} cursor-pointer`}
          onClick={handleToggleSearch}
        />
        <X
          width={24}
          height={24}
          role="button"
          aria-label="close"
          className={`${!isSearchActive && "hidden"} cursor-pointer`}
          onClick={handleToggleSearch}
        />
      </div>
    </section>
  );
};

export default GlobalSearch;
