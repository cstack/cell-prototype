import * as React from "react";
import * as Engine from "../engine";

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
    return <div id="board">"Board"</div>;
  }
}

export default Board;