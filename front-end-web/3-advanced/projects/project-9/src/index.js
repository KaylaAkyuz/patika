import React from "react";
import ReactDOM from "react-dom/client";
import ThemeConfigProvider from "./theme";
import Game from "components/Game";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeConfigProvider>
    <Game />
  </ThemeConfigProvider>
);
