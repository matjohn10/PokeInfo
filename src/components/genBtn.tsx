import { useEffect } from "react";

interface Props {
  gen: number;
  justClicked: number;
  setJustClicked: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  setCount: (value: React.SetStateAction<number>) => void;
  otherStates: boolean[];
  updateOthers: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const GenBtn = ({
  gen,
  justClicked,
  setJustClicked,
  otherStates,
  setCount,
  updateOthers,
}: Props) => {
  const generation = gen.toString();
  //   let [clicked, setClicked] = useState(otherStates[gen - 1]);
  const baseClass = "btn btn-primary gen-btn";

  const handleClassName = () => {
    if (justClicked !== gen && otherStates[gen - 1]) {
      otherStates[gen - 1] = false;
      useEffect(() => {
        updateOthers(otherStates);
      }, []);

      return false;
    } else if (justClicked === gen) {
      return true;
    }
    return false;
  };

  return (
    <button
      className={handleClassName() ? baseClass + " disabled" : baseClass}
      id={generation}
      onClick={(e) => {
        e.preventDefault();
        otherStates[gen - 1] = true;
        updateOthers(otherStates);
        setJustClicked(parseInt(e.currentTarget.id));
        setCount(0);
      }}
    >
      {"Gen " + generation}
    </button>
  );
};

export default GenBtn;
