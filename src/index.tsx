import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GraphQLClient } from "./utils/GraphQLClient";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={GraphQLClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
