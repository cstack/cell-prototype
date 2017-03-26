import * as React from "react";
import * as Engine from "../engine";

import BoardSpace from "./board_space";

interface BoardProps {
  board: Engine.Board,
  focusedCoordinates: Engine.Coordinates,
  onSpaceSelected: (pos:Engine.Coordinates) => void,
};
interface BoardState {
};

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
  }
  render() {
    let boardRows = [];
    for (let i = 0; i < this.props.board.numRows; i++) {
      let boardRow = [];
      for (let j = 0; j < this.props.board.numCols; j++) {
        boardRow.push(<BoardSpace key={`board-space-${i}-${j}`} space={this.props.board.spaces[i][j]} />);
      }
      boardRows.push(<div key={`board-row-${i}`} className="board-row">{boardRow}</div>);
    }
    return <div id="board">{boardRows}</div>;
  }
}

export default Board;