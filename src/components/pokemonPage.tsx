import { useQueries } from "@tanstack/react-query";
import OtherPokeTable from "./otherPokeTable";
import axios from "axios";
import "../componentCss/pokemonPage.css";
import { BACKEND } from "../api/url";
import TypeCard from "./typeCard";

interface Props {
  pokemonName: string;
  setCarouselName: React.Dispatch<React.SetStateAction<string>>;
}

// const wait = (duration: number) =>
//   new Promise((resolve) => setTimeout(resolve, duration));

const PokemonPage = ({ pokemonName, setCarouselName }: Props) => {
  const URLNAME = BACKEND + "get/pokemons/" + pokemonName;
  const URLDES = BACKEND + "get/description/" + pokemonName;
  const URLIMG = BACKEND + "get/image/" + pokemonName;

  const [nameQuery, desQuery, imgURL] = useQueries({
    queries: [
      {
        queryKey: ["name", pokemonName],
        queryFn: async () => axios.get(URLNAME).then((res) => res.data),
      },
      {
        queryKey: ["description", pokemonName],
        queryFn: async () => axios.get(URLDES).then((res) => res.data),
      },
      {
        queryKey: ["image", pokemonName],
        queryFn: async () => axios.get(URLIMG).then((res) => res.data),
      },
    ],
  });

  if (
    nameQuery.isLoading ||
    nameQuery.isFetching ||
    desQuery.isLoading ||
    desQuery.isFetching ||
    imgURL.isFetching ||
    imgURL.isLoading
  )
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  //Specific pokemon information got from fetch:
  const types = [
    nameQuery.data.type1,
    nameQuery.data.type2,
    nameQuery.data.type3,
  ].filter((type) => type !== null);
  const { id, name, combat } = nameQuery.data;
  const imgPath = BACKEND + imgURL.data[name];
  return (
    <div className="pokemon-container">
      <div className="other-pokemon">
        <h3>{"More about " + name}</h3>
        <OtherPokeTable types={types} setCarouselName={setCarouselName} />
      </div>
      <div className="test-template">
        <div className="pokemon-img-container">
          <div
            className={
              "pokemon-img " // + nameQuery.data.type1.toLowerCase() + "-img"
            }
          >
            <img src={imgPath} alt={name} />
          </div>
        </div>
        <div className="pokemon-info">
          <div className="pokemon-id-name-container">
            <p className="pokemon-id-p">{id + " - "}</p>
            <p>{name}</p>
          </div>
          <div className="pokemon-types-combat">
            {types.map((type) => (
              <TypeCard types={types} type={type} combat={combat} />
            ))}{" "}
          </div>
          {/* {accordionTest(types, combat)} */}
          <div className="pokemon-des">
            <p>{desQuery.data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
