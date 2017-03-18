import * as React from "react";
import * as ReactDOM from "react-dom";
import CellUI from "./components/cell-ui";

let app = React.createElement(
  CellUI,
  {}
);

ReactDOM.render(app, document.getElementById("react-container"));