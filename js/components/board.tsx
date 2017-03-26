import * as React from "react";
import * as Engine from "../engine";
import Utils from "../utils";

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
        let focused = Utils.deepEqual(this.props.focusedCoordinates, {row: i, col: j});
        let onClick = () => {
          this.props.onSpaceSelected({row:i, col:j});
        }

        boardRow.push(<BoardSpace key={`board-space-${i}-${j}`} space={this.props.board.spaces[i][j]} focused={focused} onClick={onClick} />);
      }
      boardRows.push(<div key={`board-row-${i}`} className="board-row">{boardRow}</div>);
    }
    return <div id="board">{boardRows}</div>;
  }
}

export default Board;