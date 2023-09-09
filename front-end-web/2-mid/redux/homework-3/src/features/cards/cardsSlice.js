import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const cardsAdapter = createEntityAdapter({
  selectId: (card) => card.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = cardsAdapter.getInitialState();

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    initializeCards: (state, action) => {
      cardsAdapter.setAll(state, action.payload);
    },
    flipCard: (state, action) => {
      const card = state.entities[action.payload];
      if (card && !card.isMatched) {
        card.isFlipped = !card.isFlipped;
      }
    },
    matchCards: (state, action) => {
      const [card1Id, card2Id] = action.payload;
      const card1 = state.entities[card1Id];
      const card2 = state.entities[card2Id];
      if (card1 && card2) {
        card1.isMatched = true;
        card2.isMatched = true;
      }
    },
    resetCards: (state, action) => {
      cardsAdapter.updateMany(state, action.payload);
    },
  },
});

export const { selectAll: selectAllCards } = cardsAdapter.getSelectors(
  (state) => state.cards
);

export const { initializeCards, flipCard, matchCards, resetCards } =
  cardsSlice.actions;
export default cardsSlice.reducer;
