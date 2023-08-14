import { BACKEND } from "../api/url";
import { Link } from "react-router-dom";

interface Props {
  ids: number[];
  gen: number;
  imgs: Map<string, any>;
  pokemons: Map<string, any>;
  setCarouselName: React.Dispatch<React.SetStateAction<string>>;
}

const Pokedex = ({ ids, imgs, pokemons, setCarouselName }: Props) => {
  const start = ids[0] === 1 ? 0 : ids[0] - 1;

  const idArray = Array.from({ length: ids[1] - start }, (_, i) => i + ids[0]);
  const getPokemon = (num: number) => {
    const strId = num.toString();
    const { name, type1, type2, type3 } = pokemons.get(strId);
    const pathObj = imgs.get(name);
    const source = BACKEND + pathObj["paths"];
    return [num.toString(), source, name, type1, type2 || "", type3 || ""];
  };

  const handleName = (info: string) => {
    if (
      [
        "Normal",
        "Fire",
        "Water",
        "Electric",
        "Grass",
        "Ice",
        "Fighting",
        "Poison",
        "Ground",
        "Flying",
        "Psychic",
        "Bug",
        "Rock",
        "Ghost",
        "Dragon",
        "Dark",
        "Steel",
        "Fairy",
      ].includes(info)
    ) {
      return { class: "pokedex-type", isName: false };
    } else if (/^-?\d+$/.test(info)) {
      return { class: "pokedex-id", isName: false };
    } else {
      return { class: "pokedex-name", isName: true };
    }
  };

  return (
    <div className="pokedex-container">
      {idArray.map((id: number) => (
        <div key={id} className="pokedex-pokemon">
          {getPokemon(id).map((info: string) =>
            info.endsWith("jpg") ? (
              <div className="pokedex-img">
                <img src={info} alt="img"></img>
              </div>
            ) : info ? (
              handleName(info).isName ? (
                <Link
                  to={"/pokedex/" + info}
                  onClick={() => setCarouselName(info)}
                  className={handleName(info).class}
                >
                  {info}
                </Link>
              ) : (
                <div className={handleName(info).class}>{info}</div>
              )
            ) : (
              void 0
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Pokedex;
