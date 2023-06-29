import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./Component/App";
import productReducer from "./reducers/index";
import "@mui/material";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
const store = createStore(productReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Toaster position="top-right" reverseOrder={false} />
    <App />
  </Provider>
);
