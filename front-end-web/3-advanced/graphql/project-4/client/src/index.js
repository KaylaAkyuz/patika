import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import ThemeConfigProvider from "./theme";
import { VotingStatusProvider } from "./context";
import router from "./routes";
import client from "./apollo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ThemeConfigProvider>
      <VotingStatusProvider>
        <RouterProvider router={router} />
      </VotingStatusProvider>
    </ThemeConfigProvider>
  </ApolloProvider>
);
