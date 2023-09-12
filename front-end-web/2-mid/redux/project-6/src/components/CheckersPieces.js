import React from "react";
import { useSelector } from "react-redux";
import { selectLostPieces } from "../features/checkers/checkersSlice";
import "./CheckersPieces.css";

const CheckersPieces = ({ player }) => {
  const lostPieces = useSelector(selectLostPieces);
  const totalLostPieces = lostPieces[player] + lostPieces[player.toUpperCase()];
  const playerPiecesCount = {
    normal: lostPieces[player],
    king: lostPieces[player.toUpperCase()],
  };

  const renderLostPieces = () => {
    return Object.keys(playerPiecesCount).map((pieceType, index) => {
      const piecesCount = playerPiecesCount[pieceType];
      const pieces = [];

      for (let i = 0; i < piecesCount; i++) {
        pieces.push(
          <div
            key={`${pieceType}-${i}`}
            className={`piece-cell ${
              player === "b"
                ? pieceType === "king"
                  ? "black-king"
                  : "black-piece"
                : pieceType === "king"
                ? "white-king"
                : "white-piece"
            }`}
          ></div>
        );
      }
      return (
        <div key={index} className="pieces-column">
          {pieces}
        </div>
      );
    });
  };

  return (
    <div className="checkers-pieces">
      <p>{totalLostPieces}</p>
      {renderLostPieces()}
    </div>
  );
};

export default CheckersPieces;
