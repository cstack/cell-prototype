const CellEngine = require('engine').CellEngine;
const CellUI = require('./ui').CellUI;
const React = require('react');
const render = require('react-dom').render;

function createDefaultProgram() {
  return [];
}

function createDefaultBoard() {
  var numRows = 9;
  var numCols = 9;

  var rows = [];
  for (var rowNum = 0; rowNum < numRows; rowNum++) {
    var spaces = []
    for (var rowCol = 0; rowCol < numCols; rowCol++) {
      spaces.push({containsCell: false});
    }
    rows.push({spaces: spaces});
  }
  rows[4].spaces[4].containsCell = true;

  return {
    rows: rows
  };
}

function createModel() {
  var program = createDefaultProgram();
  var board = createDefaultBoard();

  return {
    program: program,
    board: board,
  }
}

var app = React.createElement(
  CellUI,
  createModel()
);

render(app, document.getElementById("app"));
