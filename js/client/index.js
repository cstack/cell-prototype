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
    var row = []
    for (var rowCol = 0; rowCol < numCols; rowCol++) {
      row.push(false);
    }
    rows.push(row);
  }
  rows[4][4] = true;

  return rows;
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
