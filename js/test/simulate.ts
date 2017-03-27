import * as TestUtils from "./test_utils";
import * as Engine from "../engine";
import Utils from "../utils";

declare var process: any;

let fixtureName = process.argv[2];
let programText = TestUtils.bufferFile(`simulation_tests/${fixtureName}/program.cell`);
let program = Engine.parse(programText).program;
let simulation = Engine.simulate(program);

function printState(state: Engine.State): void {
  state.board.spaces.forEach(function(row, rowNum) {
    row.forEach(function(space, colNum) {
      if (space.cell === undefined) {
        process.stdout.write("..");
      } else {
        process.stdout.write(Utils.pad(space.cell.id, 2));
      }
      process.stdout.write(" ");
    });
    process.stdout.write("\n");
  });
  state.cells.forEach((cell, i) => {
    process.stdout.write(`${Utils.pad(cell.id, 2)}\n`);

    state.program.commands.forEach((command, j) => {
      if (cell.programCounter == j) {
        process.stdout.write("--> ");
      } else {
        process.stdout.write("    ");
      }
      process.stdout.write(Engine.commandToString(command));
      process.stdout.write("\n");
    });
  });
}

function printSimulation(simulation: Engine.Simulation): void {
  simulation.states.forEach(function(state, cycle) {
    process.stdout.write(`Cycle ${cycle}\n`);
    printState(state);
  });
}

printSimulation(simulation);