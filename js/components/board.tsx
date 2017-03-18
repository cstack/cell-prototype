import * as React from "react";
import * as Engine from "../engine";

interface BoardProps {
  board: Engine.Board,
  focusedCoordinates: Engine.BoardPosition,
  onSpaceSelected: (pos:Engine.BoardPosition) => void,
};
interface BoardState {
};

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);
  }
  render() {
    return <div id="board">"Board"</div>;
  }
}

export default Board;