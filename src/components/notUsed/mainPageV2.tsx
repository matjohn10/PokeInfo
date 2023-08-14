// import { useState } from "react";
// import "../componentCss/mainPage.css";
// import PokeCards from "../pokeCards";
// import GenBtn from "../genBtn";

// interface Props {
//   gens: Map<number, number[]>;
// }

// const MainPageV2 = ({ gens }: Props) => {
//   let [count, setCount] = useState(0);
//   let [btnClick, setBtnClick] = useState([
//     true,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//     false,
//   ]);
//   const series = new Map<number, number[]>([
//     [1, [1, 5, 4, 3, 2]],
//     [2, [2, 1, 5, 4, 3]],
//     [3, [3, 2, 1, 5, 4]],
//     [4, [4, 3, 2, 1, 5]],
//     [5, [5, 4, 3, 2, 1]],
//   ]);

//   const addClick = () => {
//     setCount(count++ < 11 ? count++ : 1);
//   };
//   const minusClick = () => {
//     setCount(count-- > 0 ? count-- : 10);
//   };

//   const whichClass = (pos: number) => {
//     let numToClass = new Map<number, string>([
//       [1, " fourth-cont move-ani-four"],
//       [2, " third-cont move-ani-three"],
//       [3, " second-cont move-ani-two"],
//       [4, " first-cont move-ani-one"],
//       [5, " fifth-cont move-ani-five"],
//     ]);
//     const aniClass = numToClass.get(pos === 0 ? 5 : pos);
//     return aniClass;
//   };

//   const handlePosition = (position: number) => {
//     const mainClass = "move-test";

//     if (position === 1) {
//       let aniIndex = (count + 3) % 5;
//       return !count
//         ? mainClass + " first-cont"
//         : mainClass + whichClass(aniIndex);
//     } else if (position === 2) {
//       let aniIndex = (count + 2) % 5;
//       return !count
//         ? mainClass + " second-cont"
//         : mainClass + whichClass(aniIndex);
//     } else if (position === 3) {
//       let aniIndex = (count + 1) % 5;
//       return !count
//         ? mainClass + " third-cont"
//         : mainClass + whichClass(aniIndex);
//     } else if (position === 4) {
//       let aniIndex = count % 5;
//       return !count
//         ? mainClass + " fourth-cont"
//         : mainClass + whichClass(aniIndex);
//     } else {
//       let aniIndex = (count + 4) % 5;
//       return !count
//         ? mainClass + " fifth-cont"
//         : mainClass + whichClass(aniIndex);
//     }
//   };

//   const handlePosChange = (pos: number) => {
//     const serie = series.get(pos) || [];
//     return serie[count % 5];
//   };

//   // Btn information:
//   let [justClicked, setJustClicked] = useState(1); // Updates to most recent btn click

//   return (
//     <div className="main-container">
//       <h1>mainPage</h1>
//       <br></br>
//       <div className="gen-btn-container btn-group" role="group">
//         {Array.from(gens.keys()).map((gen) => (
//           <GenBtn
//             key={Math.random()}
//             gen={gen}
//             justClicked={justClicked}
//             setJustClicked={setJustClicked}
//             otherStates={btnClick}
//             updateOthers={setBtnClick}
//           />
//         ))}
//       </div>
//       <div>
//         <div className={handlePosition(1)}>
//           <PokeCards
//             pos={handlePosChange(1)}
//             delta={3}
//             count={count}
//             div_id={1}
//           />
//           <PokeCards
//             pos={handlePosChange(1)}
//             delta={3}
//             count={count}
//             div_id={1}
//           />
//         </div>
//         <div className={handlePosition(2)}>
//           <PokeCards
//             pos={handlePosChange(2)}
//             delta={2}
//             count={count}
//             div_id={2}
//           />
//           <PokeCards
//             pos={handlePosChange(2)}
//             delta={2}
//             count={count}
//             div_id={2}
//           />
//         </div>
//         <div className={handlePosition(3)}>
//           <PokeCards
//             pos={handlePosChange(3)}
//             delta={1}
//             count={count}
//             div_id={3}
//           />
//           <PokeCards
//             pos={handlePosChange(3)}
//             delta={1}
//             count={count}
//             div_id={3}
//           />
//         </div>
//         <div className={handlePosition(4)}>
//           <PokeCards
//             pos={handlePosChange(4)}
//             delta={0}
//             count={count}
//             div_id={4}
//           />
//           <PokeCards
//             pos={handlePosChange(4)}
//             delta={0}
//             count={count}
//             div_id={4}
//           />
//         </div>
//         <div className={handlePosition(5)}>
//           <PokeCards
//             pos={handlePosChange(5)}
//             delta={4}
//             count={count}
//             div_id={5}
//           />
//           <PokeCards
//             pos={handlePosChange(5)}
//             delta={4}
//             count={count}
//             div_id={5}
//           />
//         </div>
//         <button onClick={addClick}>Add</button>
//         <button onClick={minusClick}>Minus</button>
//       </div>
//     </div>
//   );
// };

// export default MainPageV2;
