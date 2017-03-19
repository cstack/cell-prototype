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
};

interface Cell {
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
};

interface Space {
  cell: Cell,
};

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
    program: commands,
    errors: errors,
  };
}

export {
  Board,
  Cell,
  Color,
  Coordinates,
  OpCode,
  ParseResult,
  Program,
  Space,
  parse,
};