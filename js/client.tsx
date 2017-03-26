import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Engine from "./engine";
import CellUI from "./components/cell-ui";

let programText: string = `- SPLIT UP
- SPLIT DOWN`;
let program: Engine.Program = Engine.parse(programText).program;

let board: Engine.Board = new Engine.Board();
let activeMap: Array<boolean> = [];
for (let i = 0; i < program.commands.length; i++) {
  activeMap.push(true);
}
board.center().cell = {
  program: program,
  activeMap: activeMap,
};

let app = <CellUI programText={programText} board={board} />;

ReactDOM.render(app, document.getElementById("react-container"));