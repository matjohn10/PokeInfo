import { useEffect, useState } from "react";
import "./builder.css";
import GetNames from "../../utils/getPokemonNames";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND } from "../../api/url";
import TeamBuilderViz from "./teamBuilderViz";
import { useNavigate } from "react-router-dom";

interface Props {
  pokemons: Map<string, any>;
  img: Map<string, any>;
  builderMode: React.Dispatch<React.SetStateAction<boolean>>;
  isTeamAdded: React.Dispatch<React.SetStateAction<number>>;
}

const BuilderMode = ({ pokemons, img, builderMode, isTeamAdded }: Props) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [pickCount, setPickCount] = useState(6);
  const [filters, setFilters] = useState<string[]>([]);
  const [toFetch, setToFetch] = useState("");
  const [typesData, setTypesData] = useState<Map<string, string[]>>(new Map());
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const pokemonNames = GetNames(pokemons);

  //states for the team viz
  const [add, setAdd] = useState(false);
  const [team, setTeam] = useState<Map<string, any>>(new Map());
  const [teamName, setTeamName] = useState("");

  const { data } = useQuery({
    queryKey: ["type", toFetch],
    queryFn: async () => {
      const { data } = await axios.get(BACKEND + `get/types/${toFetch}`);
      toFetch.length === 0
        ? setTypesData(new Map(Object.entries(data)))
        : setTypesData(new Map(typesData.set(toFetch, data)));
      clearDup(typesData);
      return data;
    },
    // enabled: !!toFetch,
  });

  const clearDup = (data: Map<string, string[]>) => {
    let temp: string[] = [];
    for (let [key, value] of data) {
      if (filters.length === 0) {
        temp = temp.concat(value || "1");
      } else if (filters.includes(key)) {
        temp = temp.concat(value || "1");
      }
    }
    const filtered = temp.filter((item) =>
      item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    setFilteredData([...new Set(filtered)]);
    return [...new Set(temp)];
  };

  useEffect(() => {
    clearDup(typesData);
  }, [searchValue, typesData]);

  //   const displayPossibilities = () => {
  //     if (filters.length === 0) {
  //       return <>First ten pokemon or nothing</>;
  //     }
  //     return (
  //       <>
  //         {clearDup(typesData).map((pokemon) => (
  //           <p key={Math.random()}>{pokemon}</p>
  //         ))}
  //       </>
  //     );
  //   };

  // VERSION 2
  const displayPossibilities2 = () => {
    // if (filters.length === 0) {
    //   return (
    //     <div className="no-data-builder">First ten pokemon or nothing</div>
    //   );
    // }
    return (
      <>
        {filteredData.map((pokemon) => {
          const ind = pokemonNames.indexOf(pokemon) + 1;
          const { name, type1, type2 } = pokemons.get(ind.toString());
          const pathObj = img.get(name);
          const source = BACKEND + pathObj["paths"];
          return (
            <div
              className="builder-members-container"
              onClick={(e) => handlePick(e, type1, type2, source)}
              key={name}
            >
              <img src={source} alt={`${name}-image`}></img>
              <p key={Math.random()}>{name}</p>
              <div className="builder-member-types-container">
                {type2 ? (
                  <>
                    <p>{type1}</p>
                    <p>{type2}</p>
                  </>
                ) : (
                  <>
                    <p>{type1}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const handlePick = (
    evnt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type1: string,
    type2: string,
    source: string
  ) => {
    if (team.has(evnt.currentTarget.children[1].innerHTML)) {
      setPickCount(pickCount + 1);
      const temp = new Map(team);
      temp.delete(evnt.currentTarget.children[1].innerHTML);
      setTeam(temp);
      setAdd(false);
      return;
    }
    if (pickCount === 0) {
      return;
    }
    setPickCount(pickCount - 1);
    setAdd(true);
    setTeam(
      new Map(
        team.set(evnt.currentTarget.children[1].innerHTML, [
          source,
          type1,
          type2,
        ])
      )
    );
  };

  const handleCheck = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = evnt.currentTarget.checked;
    const name = evnt.currentTarget.name;
    if (isChecked) {
      const newFilters = [...filters];
      newFilters.push(name);
      setFilters(newFilters);
      setToFetch(name);
    } else {
      setFilters(filters.filter((value) => value !== name));
      // add function that removes "pokemon per types" from localstorage
      const prevData = new Map(typesData);
      prevData.delete(name);
      setTypesData(prevData);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    let problem = false;
    if (pickCount !== 0 && teamName === "") {
      alert("Your team is incomplete and is missing a name.");
      problem = true;
      return;
    } else if (pickCount !== 0 || teamName === "") {
      alert(
        teamName ? "Your team is incomplete." : "Your team is missing a name."
      );
      problem = true;
      return;
    }

    const teamObj = Object.fromEntries(team);
    for (let pokeName in teamObj) {
      const data = teamObj[pokeName];
      let innerObj = {
        source: data[0],
        type1: data[1],
        type2: data[2],
      };
      teamObj[pokeName] = innerObj;
    }
    const date = new Date();
    const fullDate = {
      month: date.getUTCMonth(),
      day: date.getUTCDate(),
      year: date.getUTCFullYear(),
      time: date.getTime(),
      timezone: "UTC",
    };
    const finalTeamObj = {
      id: Math.floor(Math.random() * 10000),
      dateCreation: fullDate,
      team: { ...teamObj, name: teamName },
    };
    const response = await fetch("http://localhost:3000/users/team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: localStorage.getItem("user"),
        team: finalTeamObj,
        isIssue: problem,
      }),
    });
    setTeamName("");
    setSearchValue("");
    const data = await response.json();
    if (data.success) {
      isTeamAdded(Math.floor(Math.random() * Math.floor(Math.random() * 1000)));
      builderMode(false);
    } else {
      navigate(`/error/${data.message}`);
    }
  };

  return (
    <div className="main-builder-container">
      <div className="builder-save-container">
        {/* Make aure to add builder name */}
        <input
          className="team-name-input"
          type="text"
          placeholder="Name your team..."
          value={teamName}
          onChange={(e) => setTeamName(e.currentTarget.value)}
        />
        <div className="team-builder-viz">
          <TeamBuilderViz info={team} add={add} />
        </div>
        <button className="save-team-members-btn" onClick={handleSave}>
          Save
        </button>
        <button
          className="save-team-members-btn"
          onClick={() => {
            builderMode(false);
          }}
        >
          Cancel
        </button>
      </div>
      <input
        type="text"
        className="builder-search-input"
        placeholder="Search pokemon name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <div className="checkboxes-container">
        <input
          type="checkbox"
          value="type-check"
          name="Water"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Water">Water</label>
        <input
          type="checkbox"
          value="type-check"
          name="Bug"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Bug">Bug</label>
        <input
          type="checkbox"
          value="type-check"
          name="Fire"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Fire">Fire</label>
        <input
          type="checkbox"
          value="type-check"
          name="Normal"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Normal">Normal</label>
        <input
          type="checkbox"
          value="type-check"
          name="Dark"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Dark">Dark</label>
        <input
          type="checkbox"
          value="type-check"
          name="Flying"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Flying">Flying</label>
        <input
          type="checkbox"
          value="type-check"
          name="Poison"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Poison">Poison</label>
        <input
          type="checkbox"
          value="type-check"
          name="Dragon"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Dragon">Dragon</label>
        <input
          type="checkbox"
          value="type-check"
          name="Ghost"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Ghost">Ghost</label>
        <input
          type="checkbox"
          value="type-check"
          name="Psychic"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Psychic">Psychic</label>
        <input
          type="checkbox"
          value="type-check"
          name="Electric"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Electric">Electric</label>
        <input
          type="checkbox"
          value="type-check"
          name="Grass"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Grass">Grass</label>
        <input
          type="checkbox"
          value="type-check"
          name="Rock"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Rock">Rock</label>
        <input
          type="checkbox"
          value="type-check"
          name="Fairy"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Fairy">Fairy</label>
        <input
          type="checkbox"
          value="type-check"
          name="Ground"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Ground">Ground</label>
        <input
          type="checkbox"
          value="type-check"
          name="Steel"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Steel">Steel</label>
        <input
          type="checkbox"
          value="type-check"
          name="Fighting"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Fighting">Fighting</label>
        <input
          type="checkbox"
          value="type-check"
          name="Ice"
          className="builder-type-checkbox"
          onChange={(e) => {
            handleCheck(e);
          }}
        />{" "}
        <label htmlFor="Ice">Ice</label>
      </div>
      <p>{pickCount} pokemons left to pick.</p>
      <div className="filtered-list-container">{displayPossibilities2()}</div>
    </div>
  );
};

export default BuilderMode;
