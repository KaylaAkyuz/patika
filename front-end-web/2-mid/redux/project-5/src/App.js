import React, { useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer";
import WordStream from "./components/WordStream";
import InputField from "./components/InputField";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import { useDispatch, useSelector } from "react-redux";
import { selectGameState, fillCurrentStream } from "./slices/wordsSlice";

function App() {
  const dispatch = useDispatch();
  const gameState = useSelector(selectGameState);

  useEffect(() => {
    dispatch(fillCurrentStream());
  }, [dispatch]);

  return (
    <div className="app">
      <h1>Speed Typing Game</h1>
      {gameState === "restart" ? (
        <>Restarting</>
      ) : (
        <>
          {gameState === "ended" ? (
            <Results />
          ) : (
            <>
              {gameState === "started" && <Timer />}
              <WordStream />
              <InputField />
            </>
          )}
          <RestartButton />
        </>
      )}
    </div>
  );
}

export default App;
