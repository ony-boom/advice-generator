import { useEffect, useState } from "react";
import "./styles/App.css";
import DesktopPattern from "./images/pattern-divider-desktop.svg";
import MobilePattern from "./images/pattern-divider-mobile.svg";
import DiceImage from "./images/icon-dice.svg";

const fetchAdvice = async () => {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  return await data.slip;
};

const setAdvice = (set) => {
  fetchAdvice().then((response) => {
    set({ ...response });
  });
};

function App() {
  const [advice, setAdvices] = useState({});

  useEffect(() => {
    setAdvice(setAdvices);
  }, []);

  return (
    <div className="App">
      <div className="box">
        {advice.advice ? (
          <div className="content">
            <p className="advice-id">Advice #{advice.id}</p>

            <p className="advice-text" id="advice-text">
              "{advice.advice}"
            </p>

            <div id="pattern-divisor">
              <picture>
                <source
                  srcSet={MobilePattern}
                  media="(max-width: 501px)"
                  width={"100%"}
                />
                <img src={DesktopPattern} alt="separator" width={"100%"} />
              </picture>
            </div>

            <div
              id="dice-box"
              onClick={() => {
                setAdvice(setAdvices);
                document.getElementById("advice-text").classList.add("d-none");
                setTimeout(() => {
                  document
                    .getElementById("advice-text")
                    .classList.remove("d-none");
                }, 300);
              }}
            >
              <img src={DiceImage} alt="Dice" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
