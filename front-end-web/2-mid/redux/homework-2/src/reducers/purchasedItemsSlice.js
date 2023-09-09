import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const initialBalance = 100000000000; // Initial balance

const calculateBalance = (initialBalance, purchasedItems) => {
  const totalCost = purchasedItems.reduce(
    (accumulator, item) => accumulator + item.totalCost,
    0
  );
  return initialBalance - totalCost;
};

const purchasedItemsSlice = createSlice({
  name: "purchasedItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, title, price, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity ? quantity : 1;
        existingItem.totalCost += quantity ? quantity * price : price;
      } else {
        state.push({
          id,
          title,
          quantity: quantity ? quantity : 1,
          totalCost: quantity ? quantity * price : price,
        });
      }
    },
    removeItem: (state, action) => {
      const id = action.payload.id;
      const itemIndex = state.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const product = action.payload.product;
        const item = state[itemIndex];
        if (item.quantity === 1 || action.payload.sellAll) {
          state.splice(itemIndex, 1);
        } else {
          item.quantity -= 1;
          item.totalCost -= product.price;
        }
      }
    },
    quantityUpdated: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((item) => item.id === id);
      const product = action.payload.product;
      if (item) {
        item.quantity = quantity;
        item.totalCost = item.quantity * product.price;
      }
    },
  },
});

export const selectCalculatedBalance = (state) =>
  calculateBalance(initialBalance, state.purchasedItems);

export const { addItem, removeItem, quantityUpdated } =
  purchasedItemsSlice.actions;
export default purchasedItemsSlice.reducer;
