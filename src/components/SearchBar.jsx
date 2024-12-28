import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      autoComplete="off"
      className="p-2 text-black/60 focus-within:text-black-600"
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-field" className="sr-only">
        Search for any Pokémon
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-6 h-6 ml-4 text-black" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-4/5 md:w-11/12 bg-transparent border-black/60 border-b-2 focus-within:border-b-3 outline-none placeholder-black-500 text-base text-black p-3"
        />
      </div>
    </form>
  );
}

export default SearchBar;
