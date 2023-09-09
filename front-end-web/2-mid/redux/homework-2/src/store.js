import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";
import purchasedItemsReducer from "./reducers/purchasedItemsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    purchasedItems: purchasedItemsReducer,
  },
});

export default store;
