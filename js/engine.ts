import Utils from "./utils";

// Parameter Types
const colorParamter: ParameterType = {
  name: 'color',
  test: function(param: string): boolean {
    let color: Color = (<any>Color)[param];
    return (color !== undefined) && (Color[color] !== "-");
  }
}

const colorOrColorlessParamter: ParameterType = {
  name: 'colorOrColorless',
  test: function(param: string): boolean {
    let color: Color = (<any>Color)[param];
    return (color !== undefined);
  }
}

const directionParameter: ParameterType = {
  name: 'direction',
  test: function(param: string): boolean {
    let direction: Direction = (<any>Direction)[param];
    return (direction !== undefined) && (direction !== Direction.SELF);
  }
}

const directionOrSelfParamter: ParameterType = {
  name: 'directionOrSelf',
  test: function(param: string): boolean {
    let direction: Direction = (<any>Direction)[param];
    return (direction !== undefined);
  }
}

const stringParamter: ParameterType = {
  name: 'string',
  test: function(param: string): boolean {
    return typeof(param) == "string";
  }
}

// Models
class Board {
  spaces: Array<Array<Space>>;
  numRows: number;
  numCols: number;

  constructor() {
    this.numRows = 9;
    this.numCols = 9;
    this.spaces = [];
    for (let i = 0; i < this.numRows; i++) {
      let row: Array<Space> = [];
      for (let j = 0; j < this.numCols; j++) {
        row.push({cell: undefined});
      }
      this.spaces.push(row);
    }
  }

  at(pos: Coordinates): Space {
    return this.spaces[pos.row][pos.col];
  }

  center(): Space {
    return this.at({row: Math.floor(this.numRows/2), col: Math.floor(this.numCols/2)})
  }
};

interface Cell {
  activeMap: Array<boolean>,
  address: Coordinates,
  id: number,
  isNew: boolean,
  programCounter: number,
};

enum Color {
  B,
  G,
  O,
  P,
  R,
  Y,
  "-",
};

interface Command {
  color: Color,
  opCode: OpCode,
  parameters: Array<string>,
};

interface Coordinates {
  col: number,
  row: number,
};

enum Direction {
  DOWN,
  LEFT,
  RIGHT,
  SELF,
  UP,
};

enum OpCode {
  ACTIVATE,
  DIE,
  JUMP,
  JUMP_IF_TRUE,
  LABEL,
  SENSE_CELL,
  SLEEP,
  SPLIT,
  SUPPRESS,
};

const OP_CODES: {
  ACTIVATE: Array<ParameterType>,
  DIE: Array<ParameterType>,
  JUMP: Array<ParameterType>,
  JUMP_IF_TRUE: Array<ParameterType>,
  LABEL: Array<ParameterType>,
  SENSE_CELL: Array<ParameterType>,
  SLEEP: Array<ParameterType>,
  SPLIT: Array<ParameterType>,
  SUPPRESS: Array<ParameterType>,
} = {
  ACTIVATE: [directionOrSelfParamter, colorParamter],
  DIE: [],
  JUMP: [stringParamter],
  JUMP_IF_TRUE: [stringParamter],
  LABEL: [stringParamter],
  SENSE_CELL: [directionParameter],
  SLEEP: [],
  SPLIT: [directionParameter],
  SUPPRESS: [directionOrSelfParamter, colorParamter],
};

interface ParameterType {
  name: string,
  test: (param: string) => boolean,
};

interface ParseResult {
  errors: Array<string>,
  program: Program,
  success: boolean,
};

interface Program {
  commands: Array<Command>,
  text: string,
};

interface State {
  board: Board,
  cells: Array<Cell>,
  nextId: number,
  program: Program,
}

interface Simulation {
  states: Array<State>
};

interface Space {
  cell: Cell,
};

function commandToString(command: Command): string {
  let result: string = `${Color[command.color]} ${OpCode[command.opCode]}`;
  command.parameters.forEach(parameter => {
    result += ` ${parameter}`;
  });

  return result;
}

function expectedParamtersForOpcode(opCode: OpCode): Array<ParameterType> {
  switch (opCode) {
    case OpCode.ACTIVATE:
      return [directionOrSelfParamter, colorParamter];
    case OpCode.DIE:
      return [];
    case OpCode.JUMP:
      return [stringParamter];
    case OpCode.JUMP_IF_TRUE:
      return [stringParamter];
    case OpCode.LABEL:
      return [stringParamter];
    case OpCode.SENSE_CELL:
      return [directionParameter];
    case OpCode.SLEEP:
      return [];
    case OpCode.SPLIT:
      return [directionParameter];
    case OpCode.SUPPRESS:
      return [directionOrSelfParamter, colorParamter];
  }
}

function initialState(program: Program): State {
  let board: Board = new Board();
  let firstCell: Cell = {
    programCounter: 0,
    id: 0,
    activeMap: program.commands.map(()=>true),
    address: {row: 4, col: 4},
    isNew: true
  };
  board.center().cell = firstCell;
  let cells = [firstCell];

  return {
    board: board,
    cells: [firstCell],
    nextId: 1,
    program: program
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

function nextState(currentState: State): State {
  let program: Program = currentState.program;
  let board: Board = Utils.clone(currentState.board);
  let cells: Array<Cell> = Utils.clone(currentState.cells);
  let newState: State = {
    board: board,
    cells: cells,
    nextId: currentState.nextId,
    program: program
  };

  newState.cells.forEach((cell) => {
    cell.isNew = false;
  });

  newState.cells.forEach((cell) => {
    if (cell.isNew) { return; }
    if (cell.activeMap[cell.programCounter] === true) {
      let command: Command = program.commands[cell.programCounter];
      if (command.opCode == OpCode.SPLIT) {
        let direction: Direction = stringToDirection(command.parameters[0]);
        let target: Coordinates = relativeSpace(board, cell.address, direction);
        if (target !== undefined && board.spaces[target.row][target.col].cell === undefined) {
          let newCell: Cell = {
            programCounter: 0,
            id: newState.nextId,
            activeMap: Utils.clone(cell.activeMap),
            address: target,
            isNew: true
          }
          newState.nextId += 1;
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

function parse(programText: string): ParseResult {
  let lines = programText.split("\n");
  let nonEmptyLines = lines.filter(function(line){
    return line.length > 0;
  });

  let commands: Array<Command> = [];
  let errors: Array<string> = [];
  nonEmptyLines.forEach(function(line) {
    let parts = line.split(" ");
    let colorString = parts[0];
    let opCodeString = parts[1];
    let parameters = parts.slice(2,parts.length);

    let command: Command = {
      color: undefined,
      opCode: undefined,
      parameters: undefined
    };

    let color: Color = (<any>Color)[colorString];
    if (color !== undefined) {
      command.color = color;
    } else {
      errors.push(`Unknown color ${colorString}`);
      return;
    }

    let opCode: OpCode = (<any>OpCode)[opCodeString];
    if (opCode !== undefined) {
      command.opCode = opCode;
    } else {
      errors.push(`Unknown op code ${opCodeString}`);
      return;
    }

    let expectedParamters: Array<ParameterType> = expectedParamtersForOpcode(opCode);
    if (parameters.length != expectedParamters.length) {
      errors.push(`${opCodeString} expected ${expectedParamters.length} parameters but received ${parameters.length}`);
      return;
    }

    for (let i = 0; i < expectedParamters.length; i++) {
      if (!expectedParamters[i].test(parameters[i])) {
        errors.push(`parameter ${i} for ${opCodeString} should be a ${expectedParamters[i].name}`);
        return;
      }
    }

    command.parameters = parameters;

    commands.push(command);
  });

  return {
    success: errors.length == 0,
    program: {
      commands: commands,
      text: programText,
    },
    errors: errors,
  };
}

function relativeSpace(board: Board, address: Coordinates, direction: Direction): Coordinates {
  let loc: Coordinates = Utils.clone(address);
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

function simulate(program: Program): Simulation {
  let states: Array<State> = [];
  let state: State = initialState(program);;
  let cyclesElapsed = 0;
  while (cyclesElapsed < 20) {
    states.push(state);
    state = nextState(state);
    cyclesElapsed += 1;
  }
  return {
    states: states,
  };
}

function stringToDirection(s: String): Direction {
  if (s === Direction[Direction.DOWN]) {
    return Direction.DOWN;
  } else if (s === Direction[Direction.LEFT]) {
    return Direction.LEFT;
  } else if (s === Direction[Direction.RIGHT]) {
    return Direction.RIGHT;
  } else if (s === Direction[Direction.SELF]) {
    return Direction.SELF;
  } else if (s === Direction[Direction.UP]) {
    return Direction.UP;
  }
}

export {
  Board,
  Cell,
  Color,
  Command,
  Coordinates,
  OpCode,
  ParseResult,
  Program,
  Simulation,
  Space,
  State,
  commandToString,
  parse,
  simulate,
};