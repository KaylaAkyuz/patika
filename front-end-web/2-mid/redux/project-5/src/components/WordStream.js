import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentWord,
  selectCurrentStream,
  selectCurrentInput,
  selectCurrentCorrectness,
  selectCurrentWordIndex,
  selectGameState,
} from "../slices/wordsSlice";

const WordStream = () => {
  const wordsStream = useSelector(selectCurrentStream);
  const currentWord = useSelector(selectCurrentWord);
  const currentInput = useSelector(selectCurrentInput);
  const currentCorrectness = useSelector(selectCurrentCorrectness);
  const currentWordIndex = useSelector(selectCurrentWordIndex);
  const gameState = useSelector(selectGameState);

  const isWordCorrect = currentWord
    ? currentWord.startsWith(currentInput)
    : null;

  const wordClass = (index) => {
    let className =
      gameState === "started" && index === currentWordIndex
        ? "current-word"
        : "";
    if (gameState === "started") {
      if (currentCorrectness[index] === undefined) {
        if (index === currentWordIndex) {
          className += isWordCorrect ? " correct" : " incorrect";
        }
      } else {
        className += currentCorrectness[index] ? " correct" : " incorrect";
      }
    }
    return className;
  };

  const streamClass = () => {
    const wordsPerLine = 5;
    return `word-stream words-per-line-${wordsPerLine}`;
  };

  return (
    <div className={streamClass()}>
      {wordsStream.map((word, index) => (
        <span key={index} className={wordClass(index)}>
          {word}
        </span>
      ))}
    </div>
  );
};

export default WordStream;
