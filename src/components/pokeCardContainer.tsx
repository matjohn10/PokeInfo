import Card from "./card";
import PokeCardsV2 from "./pokeCardsV2";
import { BASEURL } from "../api/url";

interface Props {
  count: number;
  gen: number[];
  pokemons: Map<string, any>;
  img: Map<string, any>;
  handlePosition: (x: number) => string;
  handlePosChange: (y: number) => number;
  addClick: () => void;
  minusClick: () => void;
  setCarouselName: React.Dispatch<React.SetStateAction<string>>;
}

const PokeCardContainer = ({
  count,
  gen,
  pokemons,
  handlePosition,
  handlePosChange,
  addClick,
  minusClick,
  setCarouselName,
}: Props) => {
  // Make a function that takes the gen range and makes array of 'Card',
  // which will be given to each 'PokeCards' as prop/Id reference.

  const makeCardArray = () => {
    let cards = [];
    //pokemons variable is a map
    for (let id = gen[0]; id < gen[1] + 1; id++) {
      const { name, type1, type2, type3 } = pokemons.get(id.toString());
      const types = [type1, type2, type3].filter((item) => item !== null);
      const url = BASEURL + "/static/img/pokemon" + id.toString() + ".jpg";

      const newCard = (
        <Card
          id={id}
          name={name}
          types={types}
          img={url}
          setCarouselName={setCarouselName}
        />
      );
      cards.push(newCard);
    }

    return cards;
  };
  return (
    <div className="card-container">
      <div className="cards-relative">
        <div className={handlePosition(1)}>
          <PokeCardsV2
            genPokemons={makeCardArray()}
            pos={handlePosChange(1)}
            delta={3}
            count={count}
            div_id={1}
          />
        </div>
        <div className={handlePosition(2)}>
          <PokeCardsV2
            genPokemons={makeCardArray()}
            pos={handlePosChange(2)}
            delta={2}
            count={count}
            div_id={2}
          />
        </div>
        <div className={handlePosition(3)}>
          <PokeCardsV2
            genPokemons={makeCardArray()}
            pos={handlePosChange(3)}
            delta={1}
            count={count}
            div_id={3}
          />
        </div>
        <div className={handlePosition(4)}>
          <PokeCardsV2
            genPokemons={makeCardArray()}
            pos={handlePosChange(4)}
            delta={0}
            count={count}
            div_id={4}
          />
        </div>
        <div className={handlePosition(5)}>
          <PokeCardsV2
            genPokemons={makeCardArray()}
            pos={handlePosChange(5)}
            delta={4}
            count={count}
            div_id={5}
          />
        </div>
      </div>
      <div className="add-btn-container">
        <button onClick={addClick}>Add</button>
        <button onClick={minusClick}>Minus</button>
      </div>
    </div>
  );
};

export default PokeCardContainer;
