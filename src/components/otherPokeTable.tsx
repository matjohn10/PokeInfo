import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { BACKEND } from "../api/url";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "./loader/loadingScreen";


interface Props {
  types: string[];
  setCarouselName: React.Dispatch<React.SetStateAction<string>>;
}

const OtherPokeTable = ({ types, setCarouselName }: Props) => {
  let [btnSelected, setBtnSelected] = useState([true, false, false]);
  let [typeSelected, setTypeSelected] = useState(types[0]);
  const [typeData, setTypeData] = useState([]);

  const handleDisabled = (ind: number) => {
    return btnSelected[ind];
  };
  const handleClick = (ind: number, type: string) => {
    let newState = [false, false, false];
    newState[ind] = true;
    setBtnSelected(newState);
    setTypeSelected(type);
  };

  // const { isLoading, isFetching } = useQuery({
  //   queryKey: ["first", typeSelected],
  //   queryFn: async () => {
  //     const { data } = await axios.get(BACKEND + "get/types/" + typeSelected);
  //     setTypeData(data);
  //     return data;
  //   },
  // });
  const getTypes = async () => {
    const { data } = await axios.get(BACKEND + "get/types/" + typeSelected);
    setTypeData(data);
    // await sleep(500);
    return data;
  };
  const getPaths = async () => {
    const { data } = await axios.get(BACKEND + "get/image");
    return data;
  };

  const [typeQuery, pathQuery] = useQueries({
    queries: [
      {
        queryKey: ["type", typeSelected],
        queryFn: getTypes,
      },
      {
        queryKey: ["path"],
        queryFn: getPaths,
      },
    ],
  });
  console.log();
  // do useQueries when api is modified to send list of paths

  if (
    typeQuery.isLoading ||
    typeQuery.isFetching ||
    pathQuery.isFetching ||
    pathQuery.isLoading
  ) {
    return (
      <div className="poke-table">
        <div className="type-btn-container">
          {types.map((type) => (
            <button
              id={types.indexOf(type).toString()}
              key={Math.random()}
              type="button"
              className="type-btn"
              disabled={true}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="types-container">
          {/* <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> */}
          <LoadingScreen />
        </div>
      </div>
    );
  }
  console.log(BACKEND + pathQuery.data["Vulpix"]["paths"]);

  return (
    <div className="poke-table">
      <div className="type-btn-container">
        {types.map((type) => (
          <button
            id={types.indexOf(type).toString()}
            key={Math.random()}
            type="button"
            className="type-btn"
            disabled={handleDisabled(types.indexOf(type))}
            onClick={(e) => {
              e.preventDefault();
              const ind = parseInt(e.currentTarget.id);
              const type_clicked = e.currentTarget.innerText;
              handleClick(ind, type_clicked);
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="types-container">
        <ul className="list-group">
          {typeData.map((name: string) => (
            <li
              key={Math.random()}
              className="list-group-item list-group-item-secondary"
            >
              <div className="types-container-item">
                <div className="types-container-pokeimg">
                  <img
                    src={BACKEND + pathQuery.data[name]["paths"]}
                    alt={name}
                  />
                </div>
                <Link
                  to={"../pokedex/" + name}
                  onClick={() => {
                    setCarouselName(name);
                  }}
                  className="types-container-pokemon"
                >
                  {name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OtherPokeTable;
