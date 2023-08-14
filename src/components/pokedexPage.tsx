import { useState } from "react";
import "../componentCss/pokedexPage.css";
import Pokedex from "./pokedex";

interface Props {
  gens: Map<number, number[]>;
  pokemons: Map<string, any>;
  imgs: Map<string, any>;
  setCarouselName: React.Dispatch<React.SetStateAction<string>>;
}

const PokedexPage = ({ gens, pokemons, imgs, setCarouselName }: Props) => {
  const [genClicked, setGenClicked] = useState(0);

  const handleClass = (pos: number) => {
    return genClicked === pos;
  };

  return (
    <div className="main-pokedex-container">
      <h2 className="pokedex-header">POKEDEX</h2>
      <div className="btn-gen-container" role="group">
        <button
          className={
            handleClass(0)
              ? "pokedex-gen-btn" + " disabled-btn"
              : "pokedex-gen-btn"
          }
          key={0}
          onClick={() => {
            setGenClicked(0);
          }}
        >
          All
        </button>
        {Array.from(gens.keys()).map((gen) => (
          <button
            key={gen}
            className={
              handleClass(gen)
                ? "pokedex-gen-btn" + " disabled-btn"
                : "pokedex-gen-btn"
            }
            onClick={() => {
              setGenClicked(gen);
            }}
          >
            {gen}
          </button>
        ))}
      </div>
      <br></br>
      <Pokedex
        pokemons={pokemons}
        imgs={imgs}
        gen={genClicked}
        ids={gens.get(genClicked) || [1, 1008]}
        setCarouselName={setCarouselName}
      />
    </div>
  );
};

export default PokedexPage;
