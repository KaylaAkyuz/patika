import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeCards } from "./features/cards/cardsSlice";
import { generateRandomCardPairs } from "./utils/gameUtils";
import GameBoard from "./components/GameBoard";
import Author from "./components/Author";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cardData = generateRandomCardPairs();
    dispatch(initializeCards(cardData));
  }, [dispatch]);

  return (
    <div className="App">
      <Author />
      <GameBoard />
    </div>
  );
}

export default App;
