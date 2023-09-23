import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllCards,
  flipCard,
  matchCards,
  initializeCards,
} from "../features/cards/cardsSlice";
import Card from "./Card";
import ScoreDisplay from "./ScoreDisplay";

import { increaseScore, resetScore } from "../features/score/scoreSlice";
import { generateRandomCardPairs } from "../utils/gameUtils";
import { selectScore, refreshBestScore } from "../features/score/scoreSlice";

import "./GameBoard.css";

const GameBoard = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectAllCards);
  const score = useSelector(selectScore);

  const [clickedCard, setClickedCard] = useState(null);
  const [twoCardsFlipped, setTwoCardsFlipped] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const handleCardClick = (cardId) => {
    if (twoCardsFlipped) {
      return;
    }
    if (clickedCard) {
      setTwoCardsFlipped(true);
      setTimeout(() => {
        const [card1Id, card2Id] = [clickedCard, cardId];
        const card1 = cards.find((card) => card.id === card1Id);
        const card2 = cards.find((card) => card.id === card2Id);

        if (card1 && card2 && card1.imageUrl === card2.imageUrl) {
          dispatch(matchCards([card1Id, card2Id]));
          setMatchedPairs((prev) => prev + 2);
          dispatch(increaseScore(50));
        } else {
          dispatch(flipCard(card1Id));
          dispatch(flipCard(card2Id));
          dispatch(increaseScore(-5));
        }

        setClickedCard(null);
        setTwoCardsFlipped(false);
      }, 700);
    } else {
      setClickedCard(cardId);
    }
    dispatch(flipCard(cardId));
    dispatch(refreshBestScore());
  };

  const handlePlayAgain = () => {
    const cardData = generateRandomCardPairs();
    dispatch(initializeCards(cardData));
    dispatch(resetScore(cardData));
    setMatchedPairs(0);
    setClickedCard(null);
    setTwoCardsFlipped(false);
  };

  return (
    <div className="game-board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
      {matchedPairs === cards.length && (
        <div id="play-again-modal" className="modal">
          <div className="modal-content">
            <span>Game ended! Your score is {score}!</span>
            <button
              id="play-again-button"
              className="play-again-button"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      <ScoreDisplay playAgain={handlePlayAgain} />
    </div>
  );
};

export default GameBoard;
