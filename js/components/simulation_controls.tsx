import * as React from "react";
import * as Engine from "../engine";

interface SimulationControlsProps {
  onBackClicked: ()=>void,
  onForwardClicked: ()=>void,
  stateCounter: number,
};
interface SimulationControlsState {
};

class SimulationControls extends React.Component<SimulationControlsProps, SimulationControlsState> {
  constructor(props: SimulationControlsProps) {
    super(props);
  }
  render() {
    return <div>
      <button onClick={this.props.onBackClicked}>&lt;&lt;</button>
      <span>{this.props.stateCounter}</span>
      <button onClick={this.props.onForwardClicked}>&gt;&gt;</button>
    </div>;
  }
}

export default SimulationControls;