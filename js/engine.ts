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

interface Coordinates {
  col: number,
  row: number,
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

function parse(programText: string): ParseResult {
  return {
    errors: [],
    program: {},
    success: true,
  };
}

export {
  Board,
  Cell,
  Coordinates,
  ParseResult,
  Program,
  Space,
  parse,
};