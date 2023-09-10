import { configureStore } from "@reduxjs/toolkit";
import markdownReducer from "./features/markdown/markdownSlice";

const store = configureStore({
  reducer: {
    markdown: markdownReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
