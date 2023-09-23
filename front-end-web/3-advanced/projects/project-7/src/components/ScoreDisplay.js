import React from "react";
import { useSelector } from "react-redux";
import {
  selectScore,
  selectBestScore,
  selectCurrentMoves,
} from "../features/score/scoreSlice";

const ScoreDisplay = ({ playAgain }) => {
  const bestScore = useSelector(selectBestScore);
  const score = useSelector(selectScore);
  const currentMoves = useSelector(selectCurrentMoves);

  return (
    <div className="score-display">
      <h2>Best Score: {bestScore}</h2>
      <h2>Score: {score}</h2>
      <h2>Current Moves: {currentMoves}</h2>
      <div className="restart-button-container">
        <button
          id="restart-button"
          className="restart-button"
          onClick={playAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ScoreDisplay;
