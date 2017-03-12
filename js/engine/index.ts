///<reference path="index.d.ts" />

enum Color {
  B,
  G,
  O,
  P,
  R,
  Y,
}

enum Direction {
  DOWN,
  LEFT,
  RIGHT,
  UP
}

enum OpCode {
  ACTIVATE,
  DIE,
  JUMP,
  JUMP_IF_TRUE,
  LABEL,
  SENSE_CELL,
  SLEEP,
  SPLIT,
  SUPPRESS
}

const colorParamter = {
  name: 'color',
  test: function(param) {
    return Color[param] !== undefined;
  }
}

const colorOrColorlessParamter = {
  name: 'colorOrColorless',
  test: function(param) {
    return (Color[param] !== undefined) || param == "-";
  }
}

const directionParamter = {
  name: 'direction',
  test: function(param) {
    return Direction[param] !== undefined;
  }
}

const directionOrSelfParamter = {
  name: 'directionOrSelf',
  test: function(param) {
    return (Direction[param] !== undefined) || param == "SELF";
  }
}

const stringParamter = {
  name: 'string',
  test: function(param) {
    return typeof(param) == "string";
  }
}

const OP_CODES = {
  ACTIVATE: [directionOrSelfParamter, colorParamter],
  DIE: [],
  JUMP: [stringParamter],
  JUMP_IF_TRUE: [stringParamter],
  LABEL: [stringParamter],
  SENSE_CELL: [directionParamter],
  SLEEP: [],
  SPLIT: [directionParamter],
  SUPPRESS: [directionOrSelfParamter, colorParamter],
};

function parse(programString: string) {
  var lines = programString.split("\n");
  var nonEmptyLines = lines.filter(function(line){
    return line.length > 0;
  });

  var commands = [];
  var errors = [];
  nonEmptyLines.forEach(function(line) {
    var parts = line.split(" ");
    var color = parts[0];
    var opCode = parts[1];
    var parameters = parts.slice(2,parts.length);

    var command = {
      color: undefined,
      opCode: undefined,
      parameters: undefined
    };

    if (colorOrColorlessParamter.test(color)) {
      command.color = color;
    } else {
      errors.push(`Unknown color ${color}`);
      return;
    }

    if (Object.keys(OP_CODES).indexOf(opCode) > -1) {
      command.opCode = opCode;
    } else {
      errors.push(`Unknown op code ${opCode}`);
      return;
    }

    var expectedParamters = OP_CODES[opCode];
    if (parameters.length != expectedParamters.length) {
      errors.push(`${opCode} expected ${expectedParamters.length} parameters but received ${parameters.length}`);
      return;
    }

    for (var i = 0; i < expectedParamters.length; i++) {
      if (!expectedParamters[i].test(parameters[i])) {
        errors.push(`parameter ${i} for ${opCode} should be a ${expectedParamters[i].name}`);
        return;
      }
    }

    command.parameters = parameters;

    commands.push(command);
  });

  return {
    success: errors.length == 0,
    program: commands,
    errors: errors,
  };
}

function nextActiveCommand(programCounter: number, activeMap: Array<boolean>): number {
  if (activeMap.every((b)=>!b)) {
    return programCounter;
  }
  programCounter = (programCounter+1)%activeMap.length;
  while (!activeMap[programCounter]) {
    programCounter = (programCounter+1)%activeMap.length;
  }

  return programCounter;
}

function initialState(program: Array<Command>): State {
  let board:Board = {
    numRows: 9,
    numCols: 9,
    spaces:[]
  };
  for (var i = 0; i < 9; i++) {
    var row = [];
    for (var j = 0; j < 9; j++) {
      row.push({cell: undefined, address: {row: i, col: j}});
    }
    board.spaces.push(row);
  }
  let firstCell: Cell = {
    programCounter: 0,
    id: 0,
    activeMap: program.map(()=>true),
    address: {row: 4, col: 4}
  };
  board.spaces[4][4].cell = firstCell;
  var cells = [firstCell];

  return {
    board: board,
    cells: [firstCell],
    nextId: 1,
    program: program
  };
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function relativeSpace(board: Board, address: Address, direction: Direction): Address {
  let loc: Address = clone(address);
  if (direction === Direction.UP) {
    loc.row -= 1;
  } else if (direction === Direction.DOWN) {
    loc.row += 1;
  } else if (direction === Direction.RIGHT) {
    loc.col += 1;
  } else if (direction === Direction.LEFT) {
    loc.col -= 1;
  } else {
    throw `Unknown direction ${direction}`
  }

  if (loc.row >= board.numRows || loc.row < 0) {
    return undefined;
  } else if (loc.col >= board.numCols || loc.col < 0) {
    return undefined;
  } else {
    return loc;
  }
}

function nextState(currentState: State): State {
  let program: Array<Command> = currentState.program;
  let board: Board = clone(currentState.board);
  let cells: Array<Cell> = clone(currentState.cells);
  let newState: State = {
    board: board,
    cells: cells,
    nextId: currentState.nextId,
    program: program
  };

  newState.cells.forEach((cell) => {
    if (cell.activeMap[cell.programCounter] === true) {
      let command: Command = program[cell.programCounter];
      if (command.opCode == OpCode[OpCode.SPLIT]) {
        let direction: Direction = Direction[command.parameters[0]];
        let target: Address = relativeSpace(board, cell.address, direction);
        if (target !== undefined && board.spaces[target.row][target.col].cell === undefined) {
          let newCell: Cell = clone(cell);
          newCell.id = newState.nextId;
          newState.nextId += 1;
          newCell.address = target;
          board.spaces[target.row][target.col].cell = newCell;
          cells.push(newCell);
        }
      } else {
        throw `Unknown opCode ${command.opCode}`;
      }
    }
    cell.programCounter = nextActiveCommand(cell.programCounter, cell.activeMap);
  });

  return newState;
}

function simulate(program: Array<Command>): Simulation {
  let states: Array<State> = [];
  let state: State = initialState(program);
  var cyclesElapsed = 0;
  while (cyclesElapsed < 20) {
    states.push(state);
    state = nextState(state);
    cyclesElapsed += 1;
  }
  return {
    states: states,
  };
}

declare var exports: any
exports.CellEngine = {
  parse: parse,
  simulate: simulate,
  judge: function(simulation, target) {
    return {
      solution: true,
      stable: true,
      cycles: 1,
    };
  },
};