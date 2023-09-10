import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import totalCovidReducer from "./redux/totalCovidSlice";
import prefecturesCovidReducer from "./redux/prefecturesCovidSlice";

const store = configureStore({
  reducer: {
    totalCovid: totalCovidReducer,
    prefecturesCovid: prefecturesCovidReducer,
  },
});

const root = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
