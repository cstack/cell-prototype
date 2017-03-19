import * as React from "react";
import * as Engine from "../engine";

interface BoardSpaceProps {
};
interface BoardSpaceState {
};

class BoardSpace extends React.Component<BoardSpaceProps, BoardSpaceState> {
  constructor(props: BoardSpaceProps) {
    super(props);
  }
  render() {
    return <div className={"board-space"}></div>;
  }
}

export default BoardSpace;