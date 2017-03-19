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
  row: number,
  col: number,
};

interface Space {
  cell: Cell,
};

export {
  Board,
  Cell,
  Coordinates,
  Space,
};