import "../componentCss/randomizer.css";
import "../componentCss/cardColours.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { BACKEND } from "../api/url.ts";

interface Props {
  pokemons: Map<string, any>;
  gens: Map<number, number[]>;
  imgs: Map<string, any>;
}

const Randomizer = ({ gens, pokemons, imgs }: Props) => {
  const [genSelected, setGenSelected] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [selectedImg, setSelectedImg] = useState<any>("");
  const randomId = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const handleRandom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const rangeId: number[] =
      genSelected === "0"
        ? [1, 1008]
        : gens.get(parseInt(genSelected)) || [1, 1008];
    const newId = randomId(rangeId[0], rangeId[1]);
    const newPokemon = pokemons.get(newId.toString());
    setSelectedImg(BACKEND + imgs.get(newPokemon["name"])["paths"]);
    setSelectedPokemon(newPokemon);
  };

  const { data, isFetched } = useQuery({
    queryKey: ["combat", selectedPokemon],
    queryFn: async () => {
      const response = await axios.get(
        BACKEND + "get/types/combat/" + selectedPokemon["type1"]
      );
      return response.data[selectedPokemon["type1"]];
    },
    enabled: !(selectedPokemon === null),
  });
  //   if (isFetched) console.log(selectedPokemon);
  return (
    <div className="randomizer-main-container">
      <h1>Randomizer</h1>
      <br />
      <div className="gen-radio-container">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault"
            value="0"
            checked={genSelected === "0"}
            onChange={(e) => {
              setGenSelected(e.currentTarget.value);
            }}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault">
            All Gens
          </label>
        </div>
        {Array.from(gens.keys()).map((gen) => {
          return (
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id={"flexRadioDefault" + gen}
                  value={gen + ""}
                  checked={genSelected === gen + ""}
                  onChange={(e) => {
                    setGenSelected(e.currentTarget.value);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={"flexRadioDefault" + gen}
                >
                  {"Gen " + gen}
                </label>
              </div>
            </>
          );
        })}
      </div>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {selectedPokemon === null ? (
              <img src="../../question-mark.svg"></img>
            ) : (
              <>
                <div className="pokeimg">
                  <img src={selectedImg} alt="" />
                </div>
                <div className="pokename">{selectedPokemon["name"]}</div>
                <div className="pokeimg-info-container">
                  {selectedPokemon["type2"] === null ? (
                    <p>{selectedPokemon["type1"]}</p>
                  ) : (
                    <>
                      <p>{selectedPokemon["type1"]}</p>
                      <p>{selectedPokemon["type2"]}</p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flip-card-back">
            {selectedPokemon === null ? (
              <img src="../../question-mark.svg"></img>
            ) : (
              <>
                {" "}
                <div className="poke-combat">
                  <h2>Strength</h2>
                  {isFetched ? (
                    data["Strong attack"].map((item: string) => {
                      return <p>{item}</p>;
                    })
                  ) : (
                    <p>None</p>
                  )}
                </div>
                <div className="poke-combat">
                  <h2>Weakness</h2>
                  {isFetched ? (
                    data["Weak defence"].map((item: string) => {
                      return <p>{item}</p>;
                    })
                  ) : (
                    <p>None</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <button
        className="random-pokemon-btn"
        onClick={(e) => {
          handleRandom(e);
        }}
      >
        Random Pokemon
      </button>
    </div>
  );
};

export default Randomizer;
