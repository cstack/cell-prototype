import * as React from "react";
import * as Engine from "../engine";

import ProgramEditor from "./program_editor";
import CellDetail from "./cell_detail";

interface SidebarProps {
  program: Engine.Program,
  selectedCell: Engine.Cell,
  isEditingProgram: boolean,
  handleUpdatedProgram: (program: Engine.Program) => void,
  handleEditProgram: ()=>void,
};
interface SidebarState {
};

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {isEditingProgram: this.props.isEditingProgram};
  }
  render() {
    let children = [];
    if (this.props.isEditingProgram) {
      children.push(
        <ProgramEditor key="program-editor"
          programText={this.props.program.text}
          handleUpdatedProgram={this.props.handleUpdatedProgram}
        />
      );
    } else {
      children.push(
        <CellDetail key="cell-detail"
          program={this.props.program}
          selectedCell={this.props.selectedCell}
        />
      );
      children.push(
        <div key="edit-program-button">
          <button className="big-button" onClick={this.props.handleEditProgram} >Edit Program</button>
        </div>
      );
    }

    return <div id="sidebar">{children}</div>;
  }
}

export default Sidebar;