import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import ThemeConfigProvider from "./theme";
import client from "./apollo";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ThemeConfigProvider>
      <Home />
    </ThemeConfigProvider>
  </ApolloProvider>
);
