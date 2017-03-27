import * as React from "react";
import * as Engine from "../engine";

import Board from "./board";
import Sidebar from "./sidebar";

interface CellUIProps {
  programText: string,
};
interface CellUIState {
  focusedCoordinates: Engine.Coordinates,
  isEditingProgram: boolean,
  program: Engine.Program,
  simulation: Engine.Simulation,
  stateCounter: number,
};

class CellUI extends React.Component<CellUIProps, CellUIState> {
  constructor(props: CellUIProps) {
    super(props);

    let program: Engine.Program = Engine.parse(this.props.programText).program;
    let simulation: Engine.Simulation = Engine.simulate(program);
    let activeMap: Array<boolean> = [];
    for (let i = 0; i < program.commands.length; i++) {
      activeMap.push(true);
    }
    this.state = {
      focusedCoordinates: {row:4,col:4},
      isEditingProgram: true,
      program: program,
      simulation: simulation,
      stateCounter: 0,
    };
    this.onSpaceSelected = this.onSpaceSelected.bind(this);
    this.handleEditProgram = this.handleEditProgram.bind(this);
    this.handleUpdatedProgram = this.handleUpdatedProgram.bind(this);
    this.onBackClicked = this.onBackClicked.bind(this);
    this.onForwardClicked = this.onForwardClicked.bind(this);
  }
  render() {
    let selectedCell: Engine.Cell = undefined;
    if (this.state.focusedCoordinates !== undefined) {
      selectedCell = Engine.atPos(this.currentState().board, this.state.focusedCoordinates).cell;
    }
    return <div id="cell-ui">
      <Board board={this.currentState().board} onSpaceSelected={this.onSpaceSelected} focusedCoordinates={this.state.focusedCoordinates} />
      <Sidebar program={this.state.program}
        selectedCell={selectedCell}
        handleEditProgram={this.handleEditProgram}
        handleUpdatedProgram={this.handleUpdatedProgram}
        isEditingProgram={this.state.isEditingProgram}
        onBackClicked={this.onBackClicked}
        onForwardClicked={this.onForwardClicked}
        stateCounter={this.state.stateCounter}
      />
    </div>;
  }
  currentState(): Engine.State {
    return this.state.simulation.states[this.state.stateCounter];
  }
  onSpaceSelected(coordinates: Engine.Coordinates) {
    this.setState({focusedCoordinates: coordinates});
  }
  handleUpdatedProgram(program: Engine.Program): void {
    this.setState({
      isEditingProgram: false,
      program: program,
      simulation: Engine.simulate(program),
    });
  }
  handleEditProgram() {
    this.setState({
      isEditingProgram: true
    });
  }
  onBackClicked() {
    let stateCounter = this.state.stateCounter;
    if (stateCounter > 0) {
      this.setState({
        stateCounter: stateCounter-1,
      });
    }
  }
  onForwardClicked() {
    let stateCounter = this.state.stateCounter;
    if (stateCounter < (this.state.simulation.states.length - 1)) {
      this.setState({
        stateCounter: stateCounter+1,
      });
    }
  }
}

export default CellUI;