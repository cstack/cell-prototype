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

interface Command {
  color: Color,
  opCode: string,
  parameters: Array<string>
}

interface Cell {
  programCounter: number,
  rowNum: number,
  colNum: number,
  id: number,
}

interface Space {
  cell: Cell,
}

interface State {
  board: Array<Array<Space>>,
  cells: Array<Cell>,
  next_id: number,
  program: Array<Command>
}

interface Simulation {
  states: Array<State>
}

function initialState(program: Array<Command>): State {
  var board = [];
  for (var i = 0; i < 9; i++) {
    var row = [];
    for (var j = 0; j < 9; j++) {
      row.push({cell: undefined});
    }
    board.push(row);
  }
  var firstCell = {programCounter: 0, rowNum: 4, colNum: 4, id: 0};
  board[4][4].cell = firstCell;
  var cells = [firstCell];

  return {
    board: board,
    cells: [firstCell],
    next_id: 1,
    program: program
  };
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function nextState(currentState: State): State {
  return clone(currentState);
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