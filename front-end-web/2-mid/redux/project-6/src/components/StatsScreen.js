import React from "react";
import RestartButton from "./RestartButton";
import { useSelector } from "react-redux";
import {
  selectCurrentPlayer,
  selectForcedMoves,
  selectValidMoves,
} from "../features/checkers/checkersSlice";
import "./StatsScreen.css";

const StatsScreen = () => {
  const currentPlayer = useSelector(selectCurrentPlayer);
  const forcedMoves = useSelector(selectForcedMoves).length;
  const validMoves = useSelector(selectValidMoves).length;

  return (
    <div className="stats-screen">
      <h3>Current Player:</h3>
      <p>{currentPlayer === "w" ? "White" : "Black"}</p>
      <h3>Forced Moves:</h3>
      <p>{forcedMoves}</p>
      <h3>Valid Moves:</h3>
      <p>{validMoves}</p>
      <RestartButton />
    </div>
  );
};

export default StatsScreen;
