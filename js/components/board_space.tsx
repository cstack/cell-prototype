import * as React from "react";
import * as Engine from "../engine";

interface BoardSpaceProps {
  space: Engine.Space,
};
interface BoardSpaceState {
};

class BoardSpace extends React.Component<BoardSpaceProps, BoardSpaceState> {
  constructor(props: BoardSpaceProps) {
    super(props);
  }
  render() {
    let className = "board-space";
    if (this.props.space.cell !== undefined) {
      className += " board-space-cell";
    }
    return <div className={className}></div>;
  }
}

export default BoardSpace;