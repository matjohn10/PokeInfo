// import { useState } from "react";
import { Link } from "react-router-dom";
// const colours = new Map<string, string>([
//   ["normal", "hsl(60, 16%, 55%)"],
//   ["fire", "hsl(26, 85%, 56%)"],
//   ["water", "hsl(221, 82%, 66%)"],
//   ["electric", "hsl(48, 93%, 57%)"],
//   ["grass", "hsl(98, 52%, 54%)"],
//   ["ice", "hsl(177, 47%, 72%)"],
//   ["fighting", "hsl(2, 66%, 46%)"],
//   ["poison", "hsl(301, 45%, 44%)"],
//   ["ground", "hsl(43, 68%, 64%)"],
//   ["flying", "hsl(256, 81%, 76%)"],
//   ["psychic", "hsl(342, 93%, 65%)"],
//   ["bug", "hsl(67, 75%, 41%)"],
//   ["rock", "hsl(50, 21%, 46%)"],
//   ["ghost", "hsl(266, 27%, 47%)"],
//   ["dragon", "hsl(257, 97%, 60%)"],
//   ["dark", "hsl(24, 23%, 36%)"],
//   ["steel", "hsl(240, 19%, 76%)"],
//   ["fairy", "hsl(330, 50%, 68%)"],
// ]);

interface Props {
  id: number;
  name: string;
  types: string[];
  img: string;
  setCarouselName: React.Dispatch<React.SetStateAction<string>>;
}

const Card = ({ id, name, types, img, setCarouselName }: Props) => {
  return (
    // <div className={"pokecard " + types[0].toLowerCase()}>
    // <div className={"poke-img " + types[0].toLowerCase() + "-img"}>
    <div className={"pokecard"}>
      <div className="poke-id">{id.toString()}</div>
      <div className={"poke-img " + types[0].toLowerCase()}>
        <img src={img} alt="Image" />
      </div>
      <div className="poke-types">
        {types.map((type) => (
          <p key={Math.random()}>{type}</p>
        ))}
      </div>
      <div className="poke-name">
        <h3>{name.toUpperCase()}</h3>
      </div>
      <div className="btn-info-container">
        {/* <button className="poke-btn">More Info</button> */}
        <Link
          to={"/pokedex/" + name}
          onClick={() => setCarouselName(name)}
          className="poke-btn"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Card;
