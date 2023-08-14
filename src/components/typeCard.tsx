import { useState } from "react";

interface Props {
  types: any[];
  type: any;
  combat: any;
}

const TypeCard = ({ types, type, combat }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div
        className={
          types.length === 2
            ? !isClicked
              ? "pokemon-type-info"
              : "pokemon-type-info card-reveal"
            : !isClicked
            ? "pokemon-type-info single"
            : "pokemon-type-info single card-reveal"
        }
        onClick={(e) => {
          e.preventDefault();
          setIsClicked(!isClicked);
        }}
      >
        {!isClicked ? (
          <h5>{type}</h5>
        ) : (
          <>
            <p key={Math.random()}>
              {"Strength: " + combat[type]["Strong attack"].join(", ")}
            </p>
            <p key={Math.random()}>
              {"Weakness: " + combat[type]["Weak defence"].join(", ")}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default TypeCard;
