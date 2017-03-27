import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Engine from "./engine";
import CellUI from "./components/cell-ui";

let programText: string = `- SPLIT UP
- SPLIT DOWN`;

let app = <CellUI programText={programText} />;

ReactDOM.render(app, document.getElementById("react-container"));