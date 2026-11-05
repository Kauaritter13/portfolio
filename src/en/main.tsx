import React from "react";
import ReactDOM from "react-dom/client";
import Site from "../site/Site";
import { en } from "../site/content";
import "../index.css";
import "../site/site.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Site c={en} />
  </React.StrictMode>
);
