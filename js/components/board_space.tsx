import * as React from "react";
import * as Engine from "../engine";

interface BoardSpaceProps {
  space: Engine.Space,
  focused: boolean,
  onClick: ()=>void,
};
interface BoardSpaceState {
};

class BoardSpace extends React.Component<BoardSpaceProps, BoardSpaceState> {
  constructor(props: BoardSpaceProps) {
    super(props);
  }
  render() {
    let classNames = ["board-space"];
    if (this.props.space.cell !== undefined) {
      classNames.push("board-space-cell");
    } else {
      classNames.push("board-space-empty");
    }
    if (this.props.focused) {
      classNames.push("board-space-focused");
    }
    return <div className={classNames.join(" ")} onClick={this.props.onClick}></div>;
  }
}

export default BoardSpace;