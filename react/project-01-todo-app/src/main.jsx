import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client.js";
import App from "./App.jsx";
import "./index.css";
import "./fanta.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
