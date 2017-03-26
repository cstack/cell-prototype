import * as React from "react";
import * as Engine from "../engine";
import CommandList from "./command_list";

interface CellDetailProps {
  selectedCell: Engine.Cell,
};
interface CellDetailState {
};

class CellDetail extends React.Component<CellDetailProps, CellDetailState> {
  constructor(props: CellDetailProps) {
    super(props);
  }
  render() {
    let children = [];
    if (this.props.selectedCell === undefined) {
      children.push(<p key="select-a-cell">Select a cell for more details</p>);
    } else {
      children.push(<CommandList key="command-list" commands={this.props.selectedCell.program.commands} />);
    }
    return <div id="cell-detail">{children}</div>;
  }
}

export default CellDetail;