import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./utils/store";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

const audio = new Audio("./background-music.m4a");

const playAudio = () => {
  if (audio.paused) {
    audio.loop = true;
    audio.volume = 0.1;
    audio.play();
    document.removeEventListener("click", playAudio);
  }
};

document.addEventListener("click", playAudio);

const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
