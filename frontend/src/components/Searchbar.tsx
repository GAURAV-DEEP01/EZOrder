import { useState } from "react";

interface SearchbarProps {
  onSearch?: (query: string) => void;
}

export default function Searchbar({ onSearch }: SearchbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="flex-grow flex items-center justify-center order-1">
      <div className="relative w-full max-w-lg mx-5">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {!isSearchOpen && (
            <svg
              className="sm:w-4 sm:h-4 w-7 h-7 text-gray-400 cursor-pointer hover:pointer "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              onClick={toggleSearch}>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          )}
          <span className="sr-only">Search icon</span>
        </div>
        <input
          type="text"
          id="search-navbar"
          className={`block w-full p-2 sm:pl-10 text-sm text-white border border-zinc-600 rounded-lg bg-zinc-800 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 ${
            isSearchOpen ? "block" : "hidden"
          } sm:block`}
          placeholder="Search..."
          onBlur={() => setIsSearchOpen(false)}
          onChange={(e) => onSearch!(e.target.value)}
        />
      </div>
    </div>
  );
}
