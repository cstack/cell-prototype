import * as React from "react";
import * as Engine from "../engine";

import Board from "./board";

interface CellUIProps {
  board: Engine.Board,
  programText: string,
};
interface CellUIState {
  board: Engine.Board,
  programText: string,
  focusedCoordinates: Engine.BoardPosition,
};

class CellUI extends React.Component<CellUIProps, CellUIState> {
  constructor(props: CellUIProps) {
    super(props);
    this.state = {
      board: props.board,
      focusedCoordinates: {row:4,col:4},
      programText: props.programText,
    };
    this.onSpaceSelected = this.onSpaceSelected.bind(this);
  }
  render() {
    return <div id="cell-ui">
      <Board board={this.state.board} onSpaceSelected={this.onSpaceSelected} focusedCoordinates={this.state.focusedCoordinates} />
      <pre>{this.state.programText}</pre>
    </div>;
  }
  onSpaceSelected() {
  }
}

export default CellUI;