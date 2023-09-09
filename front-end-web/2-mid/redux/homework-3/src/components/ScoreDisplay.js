import React from "react";
import { useSelector } from "react-redux";
import { selectScore } from "../features/score/scoreSlice";

const ScoreDisplay = () => {
  const score = useSelector(selectScore);

  return (
    <div className="score-display">
      <h2>Score: {score}</h2>
    </div>
  );
};

export default ScoreDisplay;
