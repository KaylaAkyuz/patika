import React from "react";

const Card = ({ card, onClick }) => {
  const { imageUrl, isFlipped, isMatched } = card;

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      }`}
      onClick={!isFlipped && !isMatched ? onClick : null}
    >
      <div className="card-inner">
        <div className="card-back">
          <img src="./images/face-down.png" alt="Face Down" />
        </div>
        <div className="card-front">
          <img src={imageUrl} alt="Card" />
        </div>
      </div>
    </div>
  );
};

export default Card;
