interface Command {
  color: Color,
  opCode: OpCode,
  parameters: Array<string>
}

interface Cell {
  programCounter: number,
  id: number,
  activeMap: Array<boolean>,
  address: Address,
}

interface Space {
  cell: Cell,
}

interface Address {
  row: number,
  col: number
}

interface State {
  board: Board,
  cells: Array<Cell>,
  nextId: number,
  program: Array<Command>
}

interface Simulation {
  states: Array<State>
}

interface Board {
  numRows: number,
  numCols: number,
  spaces: Array<Array<Space>>
}

declare enum Color {
  B,
  G,
  O,
  P,
  R,
  Y,
}

declare enum Direction {
  DOWN,
  LEFT,
  RIGHT,
  UP
}

declare enum OpCode {
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
