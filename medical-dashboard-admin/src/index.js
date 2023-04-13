import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";
import Layout from "./Layouts/DefaultLayout/Layout";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
