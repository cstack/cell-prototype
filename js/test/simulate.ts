import * as TestUtils from "./test_utils";
import * as Engine from "../engine";

// declare var require: any
// declare var __dirname: any
declare var process: any;

let fixtureName = process.argv[2];
let programText = TestUtils.bufferFile(`simulation_tests/${fixtureName}/program.cell`);
let program = Engine.parse(programText).program;
let simulation = Engine.simulate(program);

function printState(state) {
  process.stdout.write("printState()");
}

function printSimulation(simulation) {
  simulation.states.forEach(function(state, cycle) {
    console.log(`Cycle ${cycle}`);
    printState(state);
  });
}

printSimulation(simulation);