import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCorrectWordCount,
  incrementWrongWordCount,
  resetScore,
  incrementCorrectKeyPressCount,
  incrementWrongKeyPressCount,
} from "../slices/scoreSlice";
import {
  selectCurrentWord,
  selectGameState,
  selectCallReset,
  startGame,
  resetGame,
  setCurrentInput,
  selectCurrentWordIndex,
  increaseCurrentWordIndex,
  popFive,
  addCurrentCorrectness,
} from "../slices/wordsSlice";

const InputField = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(selectGameState);
  const currentWordIndex = useSelector(selectCurrentWordIndex);
  const callReset = useSelector(selectCallReset);

  const [input, setInput] = useState("");
  const currentWord = useSelector(selectCurrentWord);

  useEffect(() => {
    if (callReset) {
      setInput("");
      dispatch(resetScore());
      dispatch(resetGame());
    }
  }, [callReset, dispatch]);

  const handleInputChange = (e) => {
    if (gameState !== "started") {
      dispatch(startGame());
    }

    const typedWord = e.target.value;
    setInput(typedWord);
    dispatch(setCurrentInput(typedWord));

    if (e.nativeEvent.data === " ") {
      if (typedWord.trim() === currentWord) {
        dispatch(incrementCorrectWordCount());
        dispatch(addCurrentCorrectness(true));
      } else {
        dispatch(incrementWrongWordCount());
        dispatch(addCurrentCorrectness(false));
      }
      setInput("");
      dispatch(setCurrentInput(""));
      if (currentWordIndex === 4) {
        dispatch(popFive());
      } else {
        dispatch(increaseCurrentWordIndex());
      }
    } else {
      if (currentWord.startsWith(typedWord)) {
        dispatch(incrementCorrectKeyPressCount());
      } else {
        dispatch(incrementWrongKeyPressCount());
      }
    }
  };

  return (
    <span className="input-field">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type here..."
      />
    </span>
  );
};

export default InputField;
