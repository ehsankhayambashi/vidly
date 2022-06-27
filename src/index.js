import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navbar";

ReactDOM.render(
  <BrowserRouter>
    <NavBar />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
