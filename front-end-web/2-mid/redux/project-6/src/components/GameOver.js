import React from "react";
import RestartButton from "./RestartButton";
import { useSelector } from "react-redux";
import { selectGameStatus } from "../features/checkers/checkersSlice";
import "./GameOver.css";

const GameOver = () => {
  const gameStatus = useSelector(selectGameStatus);
  return (
    <div className="game-over">
      <div className="end-text">
        <h2>
          {gameStatus === "whiteWins"
            ? "White Player Wins!"
            : gameStatus === "blackWins"
            ? "Black Player Wins!"
            : gameStatus === "draw"
            ? "It is a draw!"
            : gameStatus}
        </h2>
        <p>Congratulations!</p>
        <RestartButton />
      </div>
    </div>
  );
};

export default GameOver;
