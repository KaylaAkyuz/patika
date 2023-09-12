import React from "react";
import { useDispatch } from "react-redux";
import { restartGame, updateMoves } from "../features/checkers/checkersSlice";
import "./RestartButton.css";

const RestartButton = () => {
  const dispatch = useDispatch();

  const handleRestartGame = () => {
    dispatch(restartGame());
    dispatch(updateMoves());
  };

  return (
    <button className="restart-button" onClick={handleRestartGame}>
      Restart Game
    </button>
  );
};

export default RestartButton;
