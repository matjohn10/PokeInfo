interface Props {
  genPokemons: Object[];
  pos: number;
  delta: number;
  count: number;
  div_id: number;
}

const PokeCards = ({ pos, delta, count, div_id }: Props) => {
  const IDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  //   const handleDisplay = (pos: number, count: number) => {
  //     const num = (count % IDs.length) + (pos - 1);
  //     return IDs[num];
  //   };

  const confirmIndex = (ind: number, len: number) => {
    return ind % len;
  };

  const handleDisplayV2 = (pos: number, delta: number, count: number) => {
    const currPos = (count + delta) % 5 === 0 ? 5 : (count + delta) % 5;
    let currInd = pos >= 1 && pos <= 3 ? pos - 1 : pos + (IDs.length - 6);
    if (count % IDs.length === 0) {
      return IDs[currInd];
    } else if (currPos === 1) {
      const loop = Math.floor((count + 2) / 5) + 1;
      currInd = loop % 2 == 0 ? div_id - 1 : div_id + (IDs.length - 6); //div_id >= 1 && div_id <= 3 ? div_id - 1 : div_id + (IDs.length - 6);
      const checkerInd = currInd - (IDs.length - 5);
      const changeInd =
        checkerInd < 0 ? currInd + (IDs.length - 5) : checkerInd;
      //if (div_id === 5) addLoop();
      return IDs[changeInd];
    } else {
      let newInd = confirmIndex(currInd + (count % IDs.length), IDs.length); // pos - 1

      return IDs[newInd];
    }
  };

  return <div>{handleDisplayV2(pos, delta, count)}</div>;
};

export default PokeCards;
