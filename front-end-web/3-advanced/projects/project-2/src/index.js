import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ThemeConfigProvider from "./theme";
import router from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeConfigProvider>
    <RouterProvider router={router} />
  </ThemeConfigProvider>
);
