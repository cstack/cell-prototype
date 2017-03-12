///<reference path="index.d.ts" />
declare var require: any
declare var __dirname: any
declare var process: any
var parse = require("./index.js").CellEngine.parse;
var simulate = require("./index.js").CellEngine.simulate;

var fs = require('fs');
var path = require('path');

function bufferFile(relPath) {
  return fs.readFileSync(path.join(__dirname, relPath), "utf-8"); // zzzz....
}

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function printState(state: State) {
  state.board.spaces.forEach(function(row, rowNum) {
    row.forEach(function(space, colNum) {
      if (space.cell === undefined) {
        process.stdout.write("..");
      } else {
        process.stdout.write(pad(space.cell.id, 2));
      }
      process.stdout.write(" ");
    });
    process.stdout.write("\n");
  });
  state.cells.forEach((cell, i) => {
    process.stdout.write(`${pad(cell.id, 2)}\n`);

    state.program.forEach((command, j) => {
      if (cell.programCounter == j) {
        process.stdout.write("--> ");
      } else {
        process.stdout.write("    ");
      }
      process.stdout.write(`${command.color} ${command.opCode}`);
      command.parameters.forEach((parameter => {
        process.stdout.write(` ${parameter}`);
      }));
      process.stdout.write("\n");
    });
  });
}

function printSimulation(simulation) {
  simulation.states.forEach(function(state, cycle) {
    console.log(`Cycle ${cycle}`);
    printState(state);
  });
}

var fixtureName = process.argv[2];
var programText = bufferFile(`simulation_tests/${fixtureName}/program.cell`);
var program = parse(programText).program;
var simulation = simulate(program);

printSimulation(simulation);
