import * as React from "react";
import * as Engine from "../engine";

import ProgramEditor from "./program_editor";
import CellDetail from "./cell_detail";

interface SidebarProps {
  programText: string,
  selectedCell: Engine.Cell,
};
interface SidebarState {
  isEditingProgram: boolean,
};

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {isEditingProgram: true};

    this.handleUpdatedProgram = this.handleUpdatedProgram.bind(this);
    this.handleEditProgram = this.handleEditProgram.bind(this);
  }
  render() {
    let children = [];
    if (this.state.isEditingProgram) {
      children.push(<ProgramEditor key="program-editor" programText={this.props.programText} handleUpdatedProgram={this.handleUpdatedProgram} />);
    } else {
      children.push(<CellDetail key="cell-detail" selectedCell={this.props.selectedCell} />);
      children.push(
        <div key="edit-program-button">
          <button className="big-button" onClick={this.handleEditProgram} >Edit Program</button>
        </div>
      );
    }

    return <div id="sidebar">{children}</div>;
  }
  handleUpdatedProgram() {
    this.setState({
      isEditingProgram: false
    });
  }
  handleEditProgram() {
    this.setState({
      isEditingProgram: true
    });
  }
}

export default Sidebar;