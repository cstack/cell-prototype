import * as React from "react";
import * as Engine from "../engine";

interface SidebarProps {
  programText: string,
  selectedCell: Engine.Cell,
};
interface SidebarState {
};

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
  }
  render() {
    return <div id="sidebar">Sidebar</div>;
  }
}

export default Sidebar;