import { createSlice } from "@reduxjs/toolkit";
import words from "../assets/words.json";

const initialState = {
  words: words,
  currentStream: [],
  currentInput: "",
  gameState: "not-started",
  currentWordIndex: 0,
  currentCorrectness: [],
  callReset: false,
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setWords: (state, action) => {
      state.words = action.payload;
    },
    fillCurrentStream: (state, action) => {
      state.currentStream = selectRandomNWord(state, 15);
    },
    popWord: (state) => {
      state.currentStream = state.currentStream.slice(1);
      state.currentStream = [...state.currentStream, selectRandomWord(state)];
    },
    popFive: (state) => {
      state.currentStream = state.currentStream.slice(5);
      state.currentStream = [
        ...state.currentStream,
        ...selectRandomNWord(state, 5),
      ];
      state.currentWordIndex = 0;
      state.currentCorrectness = [];
    },
    startGame: (state) => {
      state.gameState = "started";
    },
    endGame: (state) => {
      state.gameState = "ended";
    },
    callReset: (state) => {
      state.callReset = true;
    },
    resetGame: (state) => {
      state.callReset = false;
      state.gameState = "not-started";
      state.currentStream = selectRandomNWord(state, 15);
      state.currentInput = "";
      state.currentWordIndex = 0;
      state.currentCorrectness = [];
    },
    setCurrentInput: (state, action) => {
      state.currentInput = action.payload;
    },
    setCurrentWordIndex: (state, action) => {
      state.currentWordIndex = action.payload;
    },
    increaseCurrentWordIndex: (state) => {
      state.currentWordIndex += 1;
    },
    addCurrentCorrectness: (state, action) => {
      state.currentCorrectness.push(action.payload);
    },
  },
});

export const selectRandomWord = (state) => {
  const randomIndex = Math.floor(Math.random() * state.words.length);
  return state.words[randomIndex];
};

export const selectRandomNWord = (state, n) => {
  const randomIndices = [];
  while (randomIndices.length < n) {
    const randomIndex = Math.floor(Math.random() * state.words.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }
  return randomIndices.map((index) => state.words[index]);
};

export const selectGameState = (state) => state.words.gameState;

export const selectCallReset = (state) => state.words.callReset;

export const selectCurrentStream = (state) => state.words.currentStream;

export const selectCurrentWord = (state) =>
  state.words.currentStream[state.words.currentWordIndex];

export const selectCurrentInput = (state) => state.words.currentInput;

export const selectCurrentWordIndex = (state) => state.words.currentWordIndex;

export const selectCurrentCorrectness = (state) =>
  state.words.currentCorrectness;

export const {
  setWords,
  fillCurrentStream,
  setCurrentInput,
  startGame,
  endGame,
  callReset,
  resetGame,
  popFive,
  increaseCurrentWordIndex,
  addCurrentCorrectness,
} = wordsSlice.actions;

export default wordsSlice.reducer;
