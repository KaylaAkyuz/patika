import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { endGame } from "../slices/wordsSlice";

const Timer = () => {
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      dispatch(endGame());
    }
  }, [dispatch, timeRemaining]);

  return <div className="timer">Time Remaining: {timeRemaining} seconds</div>;
};

export default Timer;
