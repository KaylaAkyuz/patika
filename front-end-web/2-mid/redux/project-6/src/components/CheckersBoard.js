import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBoard,
  selectPiece,
  unselectPiece,
  selectSelectedPiece,
  selectSelectedValidMoves,
  selectCurrentPlayer,
  handleMove,
  updateMoves,
  checkGameEnd,
  switchPlayer,
  checkRankUp,
  selectForcedMoves,
} from "../features/checkers/checkersSlice";
import "./CheckersBoard.css";

const CheckersBoard = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const player = useSelector(selectCurrentPlayer);
  const selectedPiece = useSelector(selectSelectedPiece);
  const selectedValidMoves = useSelector(selectSelectedValidMoves);
  const forcedMoves = useSelector(selectForcedMoves);

  const handleCellClick = (e) => {
    const cell = e.target;
    const col = parseInt(cell.getAttribute("data-index"));
    const row = parseInt(cell.parentNode.getAttribute("data-index"));
    const cellData = board[row][col];

    if (cellData === "n") return;

    if (selectedPiece.row === row && selectedPiece.col === col) {
      dispatch(unselectPiece());
      return;
    }

    if (cellData === "w" || cellData === "W") {
      if (player === "b") return;
      dispatch(selectPiece({ row, col }));
    } else if (cellData === "b" || cellData === "B") {
      if (player === "w") return;
      dispatch(selectPiece({ row, col }));
    } else {
      if (selectedPiece.row === null && selectedPiece.col === null) return;
    }

    if (selectedPiece.row !== null && selectedPiece.col !== null) {
      if (
        selectedValidMoves.some(
          (move) => move.toRow === row && move.toCol === col
        )
      ) {
        dispatch(handleMove({ row, col }));
        dispatch(unselectPiece());
        dispatch(checkRankUp());
        dispatch(switchPlayer());
        dispatch(updateMoves());
        dispatch(checkGameEnd());
        return;
      }
    }
  };

  const renderBoardCells = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row" data-index={rowIndex}>
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            data-index={colIndex}
            className={`cell ${
              cell === "w"
                ? "white-piece"
                : cell === "b"
                ? "black-piece"
                : cell === "W"
                ? "white-king"
                : cell === "B"
                ? "black-king"
                : cell === "n"
                ? "non-move-cell"
                : ""
            } ${
              selectedPiece.row === rowIndex && selectedPiece.col === colIndex
                ? "selected-piece"
                : selectedValidMoves.some(
                    (move) => move.toRow === rowIndex && move.toCol === colIndex
                  )
                ? "valid-move-cell"
                : forcedMoves.some(
                    (move) =>
                      move.fromRow === rowIndex && move.fromCol === colIndex
                  )
                ? "forced-move-cell"
                : ""
            }`}
            onClick={handleCellClick}
          ></div>
        ))}
      </div>
    ));
  };

  return <div className="checkers-board">{renderBoardCells()}</div>;
};

export default CheckersBoard;
