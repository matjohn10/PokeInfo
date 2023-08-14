import { useState, useRef } from "react";
import "../componentCss/searchCss.css";
import { Link } from "react-router-dom";

interface Props {
  pokemons: string[];
  setCarouselName: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ pokemons, setCarouselName }: Props) => {
  const dropMenu = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  // const [dropdown, setDropdown] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const handleDropdown = (e: MouseEvent) => {
    if (
      dropMenu.current &&
      document.hasFocus() !== input.current &&
      !dropMenu.current.contains(e.target)
    ) {
      setSearchValue("");
    }
  };
  //   const [filteredItems, setFilteredItems] = useState([]);
  let filteredItems: string[] = [];
  if (/^-?\d+$/.test(searchValue)) {
    filteredItems = pokemons.filter((item) => {
      return searchValue
        ? (pokemons.indexOf(item) + 1).toString().includes(searchValue)
        : false;
    });
  } else {
    filteredItems = pokemons.filter((item) => {
      return searchValue
        ? item.toLowerCase().includes(searchValue.toLowerCase())
        : false;
    });
  }

  //dropdown closure
  // const closeOpenMenus = (e: MouseEvent) => {
  //   if (dropMenu.current && dropdown && !dropMenu.current.contains(e.target)) {
  //     console.log(e.currentTarget);
  //     setDropdown(false);
  //     // input.current.value = "";
  //     console.log("here");
  //   } else if (filteredItems.length !== 0) {
  //     setDropdown(true);
  //   }
  // };
  document.addEventListener("mousedown", handleDropdown);

  return (
    <>
      <form className="input-form" role="search" id="poke-search-form">
        <div className="input-container input-group-lg">
          <input
            className="form-control me-2 "
            ref={input}
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.currentTarget.value);
            }}
          />
          <div className="input-selection-container" ref={dropMenu}>
            {filteredItems
              .slice(0, filteredItems.length < 10 ? filteredItems.length : 10)
              .map((item) => {
                return (
                  <Link
                    key={Math.random()}
                    to={"/pokedex/" + item}
                    className="search-item-link"
                    onClick={() => {
                      setCarouselName(item);
                    }}
                  >
                    {item}
                  </Link>
                );
              })}
          </div>
        </div>
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
