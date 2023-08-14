import { useState } from "react";
import "../componentCss/mainPage.css";

const MainPage = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="main-container">
      <h1>mainPage</h1>
      <br></br>
      <div
        className={
          !isClicked
            ? "first-cont move-test"
            : "first-cont move-test move-ani-one"
        }
      >
        <div>1</div>
        <div>1</div>
      </div>
      <div
        className={
          !isClicked
            ? "second-cont move-test"
            : "second-cont move-test move-ani-two"
        }
      >
        <div>2</div>
        <div>2</div>
      </div>
      <div
        className={
          !isClicked
            ? "third-cont move-test"
            : "third-cont move-test move-ani-three"
        }
      >
        <div>3</div>
        <div>3</div>
      </div>
      <div
        className={
          !isClicked
            ? "fourth-cont move-test"
            : "fourth-cont move-test move-ani-four"
        }
      >
        <div>4</div>
        <div>4</div>
      </div>
      <div
        className={
          !isClicked
            ? "fifth-cont move-test"
            : "fifth-cont move-test move-ani-five"
        }
      >
        <div>5</div>
        <div>5</div>
      </div>
      <button
        onClick={() => {
          setIsClicked(!isClicked);
          console.log(5 % 5);
        }}
      >
        {!isClicked ? "Move Div" : "Reset"}
      </button>
    </div>
  );
};

export default MainPage;
