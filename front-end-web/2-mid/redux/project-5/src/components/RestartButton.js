import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetScore } from "../slices/scoreSlice";
import { callReset, selectGameState, resetGame } from "../slices/wordsSlice";

const RestartButton = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(selectGameState);

  const handleRestartClick = () => {
    if (gameState === "ended") {
      dispatch(resetScore());
      dispatch(resetGame());
    } else dispatch(callReset());
  };

  return (
    <button
      className="restart-button"
      onClick={handleRestartClick}
      style={
        gameState === "ended"
          ? { borderRadius: "10px" }
          : { borderRadius: "0 10px 10px 0" }
      }
    >
      Restart
    </button>
  );
};

export default RestartButton;
