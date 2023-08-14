import { useState } from "react";
import "../componentCss/mainPage.css";
import GenBtn from "./genBtn";
import PokeCardContainer from "./pokeCardContainer";

interface Props {
  gens: Map<number, number[]>;
  pokemons: Map<string, any>;
  img: Map<string, any>;
  setCarouselName: React.Dispatch<React.SetStateAction<string>>;
}

const MainPageV3 = ({ gens, pokemons, img, setCarouselName }: Props) => {
  let [count, setCount] = useState(0);
  let [btnClick, setBtnClick] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const series = new Map<number, number[]>([
    [1, [1, 5, 4, 3, 2]],
    [2, [2, 1, 5, 4, 3]],
    [3, [3, 2, 1, 5, 4]],
    [4, [4, 3, 2, 1, 5]],
    [5, [5, 4, 3, 2, 1]],
  ]);
  // Btn information:
  let [justClicked, setJustClicked] = useState(1); // Updates to most recent btn click

  //variable that keeps track of length of gen:
  const gen = gens.get(justClicked) || [1, 10];
  const countMax = gen[1] - gen[0] + 1;

  const addClick = () => {
    setCount(count++ < countMax ? count++ : 1);
  };
  const minusClick = () => {
    // setCount(count-- > 0 ? count-- : 10);
    alert("Not implemented yet.");
  };

  const whichClass = (pos: number) => {
    let numToClass = new Map<number, string>([
      [1, " fourth-cont move-ani-four"],
      [2, " third-cont move-ani-three"],
      [3, " second-cont move-ani-two"],
      [4, " first-cont move-ani-one"],
      [5, " fifth-cont move-ani-five"],
    ]);
    const aniClass = numToClass.get(pos === 0 ? 5 : pos);
    return aniClass;
  };

  const handlePosition = (position: number) => {
    const mainClass = "move-test";

    if (position === 1) {
      let aniIndex = (count + 3) % 5;
      return !count
        ? mainClass + " first-cont"
        : mainClass + whichClass(aniIndex);
    } else if (position === 2) {
      let aniIndex = (count + 2) % 5;
      return !count
        ? mainClass + " second-cont"
        : mainClass + whichClass(aniIndex);
    } else if (position === 3) {
      let aniIndex = (count + 1) % 5;
      return !count
        ? mainClass + " third-cont"
        : mainClass + whichClass(aniIndex);
    } else if (position === 4) {
      let aniIndex = count % 5;
      return !count
        ? mainClass + " fourth-cont"
        : mainClass + whichClass(aniIndex);
    } else {
      let aniIndex = (count + 4) % 5;
      return !count
        ? mainClass + " fifth-cont"
        : mainClass + whichClass(aniIndex);
    }
  };

  const handlePosChange = (pos: number) => {
    const serie = series.get(pos) || [];
    return serie[count % 5];
  };

  // Gives the generation to show based on justClicked
  const handleSelectedGen = () => {
    const gen = gens.get(justClicked);
    return gen || [];
  };
  // Give count and set count to every btn to reset count at click
  return (
    <div className="main-container">
      <h1>Carousel</h1>
      <br />
      <br></br>
      <div className="gen-btn-container btn-group" role="group">
        {Array.from(gens.keys()).map((gen) => (
          <GenBtn
            key={Math.random()}
            gen={gen}
            justClicked={justClicked}
            setJustClicked={setJustClicked}
            count={count}
            setCount={setCount}
            otherStates={btnClick}
            updateOthers={setBtnClick}
          />
        ))}
      </div>
      <PokeCardContainer
        count={count}
        gen={handleSelectedGen()}
        pokemons={pokemons}
        img={img}
        handlePosition={handlePosition}
        handlePosChange={handlePosChange}
        addClick={addClick}
        minusClick={minusClick}
        setCarouselName={setCarouselName}
      />
    </div>
  );
};

export default MainPageV3;
