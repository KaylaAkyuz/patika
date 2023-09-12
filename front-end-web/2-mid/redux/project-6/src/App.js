import React, { useEffect } from "react";
import CheckersBoard from "./components/CheckersBoard";
import CheckersPieces from "./components/CheckersPieces";
import GameOver from "./components/GameOver";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMoves,
  selectGameStatus,
} from "./features/checkers/checkersSlice";

import "./App.css";
import StatsScreen from "./components/StatsScreen";
import Author from "./components/Author";

function App() {
  const dispatch = useDispatch();
  const gameStatus = useSelector(selectGameStatus);

  useEffect(() => {
    dispatch(updateMoves());
  }, [dispatch]);

  return (
    <div
      className="app"
      style={
        gameStatus === "active"
          ? {
              marginLeft: "200px",
            }
          : {}
      }
    >
      <div className="app-header">
        <h1>Checkers Game</h1>
      </div>
      {gameStatus === "active" ? (
        <div className="game-area">
          <StatsScreen />
          <CheckersPieces player="b" />
          <CheckersBoard />
          <CheckersPieces player="w" />
        </div>
      ) : (
        <GameOver />
      )}
      <Author />
    </div>
  );
}

export default App;
