import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import ThemeConfigProvider from "./theme";
import client from "./apollo";
import App from "components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ThemeConfigProvider>
      <App />
    </ThemeConfigProvider>
  </ApolloProvider>
);
