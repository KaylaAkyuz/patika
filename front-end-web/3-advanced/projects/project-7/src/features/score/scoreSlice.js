import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  bestScore: localStorage.getItem("bestScore") || 0,
  currentMoves: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increaseScore: (state, action) => {
      state.score += action.payload;
      state.currentMoves += 1;
    },
    resetScore: (state, action) => {
      state.score = 0;
      state.currentMoves = 0;
    },
    refreshBestScore: (state, action) => {
      if (state.score > state.bestScore) {
        state.bestScore = state.score;
        localStorage.setItem("bestScore", state.score);
      }
    },
  },
});

export const selectScore = (state) => state.score.score;

export const selectBestScore = (state) => state.score.bestScore;

export const selectCurrentMoves = (state) => state.score.currentMoves;

export const { increaseScore, resetScore, refreshBestScore } =
  scoreSlice.actions;

export default scoreSlice.reducer;
