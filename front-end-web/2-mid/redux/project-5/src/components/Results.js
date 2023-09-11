import React from "react";
import { useSelector } from "react-redux";
import { selectAllScores } from "../slices/scoreSlice";

const Results = () => {
  const {
    wpm,
    accuracy,
    wordAccuracy,
    correctWordCount,
    wrongWordCount,
    correctKeyPressCount,
    wrongKeyPressCount,
    totalWords,
    totalKeyPresses,
  } = useSelector(selectAllScores);

  return (
    <div className="results">
      <h2>Game Results</h2>
      <p>Words Per Minute: {wpm}</p>
      <p>
        Word Accuracy: {wordAccuracy}%{" ("}
        <span style={{ color: "green" }}>{correctWordCount}</span>|
        <span style={{ color: "red" }}>{wrongWordCount}</span>
        {") "}
        <span style={{ color: "grey" }}>{totalWords}</span>
      </p>
      <p>
        Key Accuracy: {accuracy}%{" ("}
        <span style={{ color: "green" }}>{correctKeyPressCount}</span>|
        <span style={{ color: "red" }}>{wrongKeyPressCount}</span>
        {") "}
        <span style={{ color: "grey" }}>{totalKeyPresses}</span>
      </p>
    </div>
  );
};

export default Results;
