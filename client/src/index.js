import { ApolloProvider } from "react-apollo";
// const lient = new ApolloClient();

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Create from "./Components/Create";
import show from "./Components/show";

const client = new ApolloClient({ uri: "http://localhost:8001/graphql" });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={App} />

        <Route path="/create" component={Create} />
        <Route path="/show" component={show} />
        {/* <App /> */}
      </div>
    </Router>
    {/* <App /> */}
  </ApolloProvider>,
  document.getElementById("root")
);
