const CellEngine = require('engine').CellEngine;
const CellUI = require('./ui').CellUI;
const React = require('react');
const render = require('react-dom').render;

function createDefaultProgramText() {
  return "- SPLIT UP\n- SPLIT DOWN";
}

function createDefaultBoard(program) {
  var numRows = 9;
  var numCols = 9;

  var rows = [];
  for (var rowNum = 0; rowNum < numRows; rowNum++) {
    var spaces = []
    for (var rowCol = 0; rowCol < numCols; rowCol++) {
      spaces.push({cell: undefined});
    }
    rows.push({spaces: spaces});
  }
  rows[4].spaces[4].cell = {
    commands: program
  };

  return {
    rows: rows
  };
}

function createModel() {
  var programText = createDefaultProgramText();
  var program = CellEngine.parse(programText).program;
  var board = createDefaultBoard(program);

  return {
    programText: programText,
    board: board,
  }
}

var app = React.createElement(
  CellUI,
  createModel()
);

render(app, document.getElementById("app"));
