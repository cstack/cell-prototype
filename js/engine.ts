class Board {
  spaces: Array<Array<Space>>;

  constructor() {
    this.spaces = [];
    for (let i = 0; i < 9; i++) {
      let row: Array<Space> = [];
      for (let j = 0; j < 9; j++) {
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