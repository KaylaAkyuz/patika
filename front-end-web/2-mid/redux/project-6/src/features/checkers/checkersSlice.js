import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [
    ["n", "b", "n", "b", "n", "b", "n", "b"],
    ["b", "n", "b", "n", "b", "n", "b", "n"],
    ["n", "b", "n", "b", "n", "b", "n", "b"],
    ["", "n", "", "n", "", "n", "", "n"],
    ["n", "", "n", "", "n", "", "n", ""],
    ["w", "n", "w", "n", "w", "n", "w", "n"],
    ["n", "w", "n", "w", "n", "w", "n", "w"],
    ["w", "n", "w", "n", "w", "n", "w", "n"],
  ],
  currentPlayer: "b", // "w" for white, "b" for black
  gameStatus: "active", // "active", "whiteWins", "blackWins", "draw"
  lostPieces: {
    w: 0,
    W: 0,
    b: 0,
    B: 0,
  },
  selectedPiece: {
    row: null,
    col: null,
  },
  forcedMoves: [],
  validMoves: [],
  selectedValidMoves: [],
};

const checkersSlice = createSlice({
  name: "checkers",
  initialState,
  reducers: {
    updateGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
    switchPlayer: (state) => {
      if (state.forcedMoves.length > 0) return;
      state.currentPlayer = state.currentPlayer === "w" ? "b" : "w";
    },
    checkRankUp: (state) => {
      const board = state.board;
      const currentPlayer = state.currentPlayer;

      if (currentPlayer === "w") {
        for (let col = 0; col < board.length; col++) {
          if (board[0][col] === currentPlayer) {
            board[0][col] = currentPlayer.toUpperCase();
          }
        }
      } else {
        for (let col = 0; col < board.length; col++) {
          if (board[board.length - 1][col] === currentPlayer) {
            board[board.length - 1][col] = currentPlayer.toUpperCase();
          }
        }
      }
    },
    restartGame: (state) => {
      state.board = [
        ["n", "b", "n", "b", "n", "b", "n", "b"],
        ["b", "n", "b", "n", "b", "n", "b", "n"],
        ["n", "b", "n", "b", "n", "b", "n", "b"],
        ["", "n", "", "n", "", "n", "", "n"],
        ["n", "", "n", "", "n", "", "n", ""],
        ["w", "n", "w", "n", "w", "n", "w", "n"],
        ["n", "w", "n", "w", "n", "w", "n", "w"],
        ["w", "n", "w", "n", "w", "n", "w", "n"],
      ];
      state.currentPlayer = "b";
      state.gameStatus = "active";
      state.lostPieces = {
        w: 0,
        W: 0,
        b: 0,
        B: 0,
      };
      state.selectedPiece = {
        row: null,
        col: null,
      };
      state.forcedMoves = [];
      state.validMoves = [];
      state.selectedValidMoves = [];
    },
    checkGameEnd: (state) => {
      const validMoves = state.validMoves;

      if (state.lostPieces.w + state.lostPieces.W === 12) {
        state.gameStatus = "blackWins";
        return;
      } else if (state.lostPieces.b + state.lostPieces.B === 12) {
        state.gameStatus = "whiteWins";
        return;
      }

      if (validMoves.length === 0) {
        state.gameStatus = "draw";
        return;
      }
    },
    handleMove: (state, action) => {
      const { row, col } = action.payload;
      const piece =
        state.board[state.selectedPiece.row][state.selectedPiece.col];
      state.board[state.selectedPiece.row][state.selectedPiece.col] = "";
      state.board[row][col] = piece;

      if (Math.abs(state.selectedPiece.row - row) === 2) {
        const enemyRow = (state.selectedPiece.row + row) / 2;
        const enemyCol = (state.selectedPiece.col + col) / 2;
        state.lostPieces[state.board[enemyRow][enemyCol]]++;
        state.board[enemyRow][enemyCol] = "";

        const direction = state.currentPlayer === "w" ? 1 : -1;
        const board = state.board;
        const currentPlayer = state.currentPlayer;
        const enemyPlayer = state.currentPlayer === "w" ? "b" : "w";

        const forcedMoves = state.forcedMoves;

        if (
          direction === 1 ||
          (direction === -1 && board[row][col] === currentPlayer.toUpperCase())
        ) {
          if (row >= 1 && col >= 1) {
            if (board[row - 1][col - 1].toLowerCase() === enemyPlayer) {
              if (row - 2 >= 0 && col - 2 >= 0) {
                if (board[row - 2][col - 2] === "") {
                  forcedMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row - 2,
                    toCol: col - 2,
                  });
                }
              }
            }
          }

          if (row >= 1 && col <= 6) {
            if (board[row - 1][col + 1].toLowerCase() === enemyPlayer) {
              if (row - 2 >= 0 && col + 2 < board.length) {
                if (board[row - 2][col + 2] === "") {
                  forcedMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row - 2,
                    toCol: col + 2,
                  });
                }
              }
            }
          }
        }

        if (
          direction === -1 ||
          (direction === 1 && board[row][col] === currentPlayer.toUpperCase())
        ) {
          if (row <= 6 && col >= 1) {
            if (board[row + 1][col - 1].toLowerCase() === enemyPlayer) {
              if (row + 2 < board.length && col - 2 >= 0) {
                if (board[row + 2][col - 2] === "") {
                  forcedMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row + 2,
                    toCol: col - 2,
                  });
                }
              }
            }
          }

          if (row <= 6 && col <= 6) {
            if (board[row + 1][col + 1].toLowerCase() === enemyPlayer) {
              if (row + 2 < board.length && col + 2 < board.length) {
                if (board[row + 2][col + 2] === "") {
                  forcedMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row + 2,
                    toCol: col + 2,
                  });
                }
              }
            }
          }

          state.forcedMoves = forcedMoves;
        }
      }

      state.validMoves = state.validMoves.filter(
        (move) =>
          move.fromRow !== state.selectedPiece.row ||
          move.fromCol !== state.selectedPiece.col ||
          move.toRow !== row ||
          move.toCol !== col
      );
      state.forcedMoves = state.forcedMoves.filter(
        (move) =>
          move.fromRow !== state.selectedPiece.row ||
          move.fromCol !== state.selectedPiece.col ||
          move.toRow !== row ||
          move.toCol !== col
      );
    },
    selectPiece: (state, action) => {
      const { row, col } = action.payload;
      const forcedMoves = state.forcedMoves;
      const validMoves = state.validMoves;

      if (forcedMoves.length > 0) {
        for (let i = 0; i < forcedMoves.length; i++) {
          if (
            forcedMoves[i].fromRow === row &&
            forcedMoves[i].fromCol === col
          ) {
            state.selectedPiece.row = row;
            state.selectedPiece.col = col;

            state.selectedValidMoves = forcedMoves.filter(
              (move) =>
                move.fromRow === state.selectedPiece.row &&
                move.fromCol === state.selectedPiece.col
            );
          }
        }
        return;
      }

      for (let i = 0; i < validMoves.length; i++) {
        if (validMoves[i].fromRow === row && validMoves[i].fromCol === col) {
          state.selectedPiece.row = row;
          state.selectedPiece.col = col;

          state.selectedValidMoves = validMoves.filter(
            (move) =>
              move.fromRow === state.selectedPiece.row &&
              move.fromCol === state.selectedPiece.col
          );

          return;
        }
      }
    },
    updateMoves: (state) => {
      const board = state.board;
      const currentPlayer = state.currentPlayer;
      const enemyPlayer = state.currentPlayer === "w" ? "b" : "w";
      const direction = currentPlayer === "w" ? 1 : -1;
      const playerPieces = selectPlayerPieces(state);

      const validMoves = [];
      const forcedMoves = [];

      for (let i = 0; i < playerPieces.length; i++) {
        const row = playerPieces[i].row;
        const col = playerPieces[i].col;

        if (
          direction === 1 ||
          (direction === -1 && board[row][col] === currentPlayer.toUpperCase())
        ) {
          if (row >= 1 && col >= 1) {
            if (board[row - 1][col - 1] === "") {
              validMoves.push({
                fromRow: row,
                fromCol: col,
                toRow: row - 1,
                toCol: col - 1,
              });
            } else if (board[row - 1][col - 1].toLowerCase() === enemyPlayer) {
              if (row - 2 >= 0 && col - 2 >= 0) {
                if (board[row - 2][col - 2] === "") {
                  forcedMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row - 2,
                    toCol: col - 2,
                  });
                  validMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row - 2,
                    toCol: col - 2,
                  });
                }
              }
            }
          }

          if (row >= 1 && col <= 6) {
            if (board[row - 1][col + 1] === "") {
              validMoves.push({
                fromRow: row,
                fromCol: col,
                toRow: row - 1,
                toCol: col + 1,
              });
            } else if (board[row - 1][col + 1].toLowerCase() === enemyPlayer) {
              if (row - 2 >= 0 && col + 2 < board.length) {
                if (board[row - 2][col + 2] === "") {
                  forcedMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row - 2,
                    toCol: col + 2,
                  });
                  validMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row - 2,
                    toCol: col + 2,
                  });
                }
              }
            }
          }
        }

        if (
          direction === -1 ||
          (direction === 1 && board[row][col] === currentPlayer.toUpperCase())
        ) {
          if (row <= 6 && col >= 1) {
            if (board[row + 1][col - 1] === "") {
              validMoves.push({
                fromRow: row,
                fromCol: col,
                toRow: row + 1,
                toCol: col - 1,
              });
            } else if (board[row + 1][col - 1].toLowerCase() === enemyPlayer) {
              if (row + 2 < board.length && col - 2 >= 0) {
                if (board[row + 2][col - 2] === "") {
                  forcedMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row + 2,
                    toCol: col - 2,
                  });
                  validMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row + 2,
                    toCol: col - 2,
                  });
                }
              }
            }
          }

          if (row <= 6 && col <= 6) {
            if (board[row + 1][col + 1] === "") {
              validMoves.push({
                fromRow: row,
                fromCol: col,
                toRow: row + 1,
                toCol: col + 1,
              });
            } else if (board[row + 1][col + 1].toLowerCase() === enemyPlayer) {
              if (row + 2 < board.length && col + 2 < board.length) {
                if (board[row + 2][col + 2] === "") {
                  forcedMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row + 2,
                    toCol: col + 2,
                  });
                  validMoves.push({
                    fromRow: row,
                    fromCol: col,
                    toRow: row + 2,
                    toCol: col + 2,
                  });
                }
              }
            }
          }
        }
      }

      state.forcedMoves = forcedMoves;
      state.validMoves = validMoves;
    },
    unselectPiece: (state) => {
      state.selectedPiece.row = null;
      state.selectedPiece.col = null;
      state.selectedValidMoves = [];
    },
  },
});

export const selectBoard = (state) => state.checkers.board;

export const selectCurrentPlayer = (state) => state.checkers.currentPlayer;

export const selectEnemyPlayer = (state) =>
  state.checkers.currentPlayer === "w" ? "b" : "w";

export const selectGameStatus = (state) => state.checkers.gameStatus;

export const selectLostPieces = (state) => state.checkers.lostPieces;

export const selectForcedMoves = (state) => state.checkers.forcedMoves;

export const selectValidMoves = (state) => state.checkers.validMoves;

export const selectPlayerPieces = (state) => {
  const board = state.board;
  const currentPlayer = state.currentPlayer;

  let pieces = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (board[row][col].toLowerCase() === currentPlayer) {
        pieces.push({
          row,
          col,
        });
      }
    }
  }

  return pieces;
};

export const selectSelectedPiece = (state) => state.checkers.selectedPiece;

export const selectSelectedValidMoves = (state) =>
  state.checkers.selectedValidMoves;

export const {
  updateGameStatus,
  handleMove,
  selectPiece,
  updateMoves,
  unselectPiece,
  checkGameEnd,
  switchPlayer,
  checkRankUp,
  restartGame,
} = checkersSlice.actions;

export default checkersSlice.reducer;
