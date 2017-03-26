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
  focusedCoordinates: Engine.Coordinates,
  isEditingProgram: boolean,
  program: Engine.Program
};

class CellUI extends React.Component<CellUIProps, CellUIState> {
  constructor(props: CellUIProps) {
    super(props);

    let program: Engine.Program = Engine.parse(this.props.programText).program;
    let activeMap: Array<boolean> = [];
    for (let i = 0; i < program.commands.length; i++) {
      activeMap.push(true);
    }
    let board: Engine.Board = props.board;
    board.center().cell = {
      activeMap: activeMap,
    };
    this.state = {
      board: props.board,
      focusedCoordinates: {row:4,col:4},
      isEditingProgram: true,
      program: program,
    };
    this.onSpaceSelected = this.onSpaceSelected.bind(this);
    this.handleEditProgram = this.handleEditProgram.bind(this);
    this.handleUpdatedProgram = this.handleUpdatedProgram.bind(this);
  }
  render() {
    let selectedCell: Engine.Cell = undefined;
    if (this.state.focusedCoordinates !== undefined) {
      selectedCell = this.props.board.at(this.state.focusedCoordinates).cell;
    }
    return <div id="cell-ui">
      <Board board={this.state.board} onSpaceSelected={this.onSpaceSelected} focusedCoordinates={this.state.focusedCoordinates} />
      <Sidebar program={this.state.program}
        selectedCell={selectedCell}
        handleEditProgram={this.handleEditProgram}
        handleUpdatedProgram={this.handleUpdatedProgram}
        isEditingProgram={this.state.isEditingProgram}
      />
    </div>;
  }
  onSpaceSelected(coordinates: Engine.Coordinates) {
    this.setState({focusedCoordinates: coordinates});
  }
  handleUpdatedProgram(program: Engine.Program): void {
    this.setState({
      isEditingProgram: false,
      program: program,
    });
  }
  handleEditProgram() {
    this.setState({
      isEditingProgram: true
    });
  }
}

export default CellUI;