import * as React from "react";
import * as Engine from "../engine";

import Board from "./board";
import Sidebar from "./sidebar";

interface CellUIProps {
  board: Engine.Board,
  programText: string,
};
interface CellUIState {
  board: Engine.Board,
  programText: string,
  focusedCoordinates: Engine.Coordinates,
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
    let selectedCell: Engine.Cell = undefined;
    if (this.state.focusedCoordinates !== undefined) {
      selectedCell = this.props.board.at(this.state.focusedCoordinates).cell;
    }
    return <div id="cell-ui">
      <Board board={this.state.board} onSpaceSelected={this.onSpaceSelected} focusedCoordinates={this.state.focusedCoordinates} />
      <Sidebar programText={this.state.programText} selectedCell={selectedCell}/>
    </div>;
  }
  onSpaceSelected(coordinates: Engine.Coordinates) {
    this.setState({focusedCoordinates: coordinates});
  }
}

export default CellUI;