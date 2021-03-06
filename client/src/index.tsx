import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import NotificationContext from "./context/NotificationContext";
import UserContext from "./context/UserContext";
import LanguageContext from "./context/LanguageContext";
import NotebookContext from "./context/NotebookContext";
import TimerContext from "./context/TImerContext";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <NotificationContext>
        <UserContext>
          <LanguageContext>
            <NotebookContext>
              <TimerContext>
                <Router>
                  <App />
                </Router>
              </TimerContext>
            </NotebookContext>
          </LanguageContext>
        </UserContext>
      </NotificationContext>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
