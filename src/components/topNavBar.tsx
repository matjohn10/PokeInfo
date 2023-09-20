import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import GetNames from "../utils/getPokemonNames";
import UserBadge from "./user/userBadge";

interface Props {
  pokemons: Map<string, any>;
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setCarouselName: React.Dispatch<React.SetStateAction<string>>;
  setCurrUser: React.Dispatch<React.SetStateAction<null>>;
}

const TopNavBar = ({
  pokemons,
  setCarouselName,
  logged,
  setLogged,
  setCurrUser,
}: Props) => {
  return (
    <nav className="navbar navbar-expand-lg red-nav">
      <div className="container-fluid  nav-spacing">
        <Link
          to="/"
          className="brand-link"
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <img
            src="../../logo.PNG"
            alt="Logo"
            style={{
              height: "1.8rem",
              width: "1.8rem",
              margin: "0",
              padding: "0",
            }}
          />
          PokeInfo
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-spacing">
            <li className="nav-item li-outline-light">
              <Link to="/" className="link-white">
                Home
              </Link>
            </li>
            <li className="nav-item li-outline-light">
              <Link to="/carousel" className="link-white">
                Carousel
              </Link>
            </li>
            <li className="nav-item li-outline-light">
              <Link to="/pokedex" className="link-white">
                Pokedex
              </Link>
            </li>
            <li className="nav-item li-outline-light">
              <Link to="/randomizer" className="link-white">
                Randomizer
              </Link>
            </li>
            <li className="nav-item li-outline-light">
              <Link
                to={logged ? "/team" : "/connection"}
                className="link-white"
              >
                Teams
              </Link>
            </li>
          </ul>
          <SearchBar
            pokemons={GetNames(pokemons)}
            setCarouselName={setCarouselName}
          />
          <UserBadge
            logged={logged}
            setLogged={setLogged}
            setCurrUser={setCurrUser}
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
