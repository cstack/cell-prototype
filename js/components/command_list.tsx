import * as React from "react";
import * as Engine from "../engine";
import Command from "./command";

interface CommandListProps {
  cell: Engine.Cell,
  program: Engine.Program,
};
interface CommandListState {
};

class CommandList extends React.Component<CommandListProps, CommandListState> {
  constructor(props: CommandListProps) {
    super(props);
  }
  render() {
    let listItems = this.props.program.commands.map((command, i) => {
      let classes: Array<String> = [];
      if (this.props.cell.activeMap[i] === false) {
        classes.push("command-suppressed");
      }
      if (this.props.cell.programCounter === i) {
        classes.push("command-current");
      }
      return <li key={`command-list-${i}`} className={classes.join(" ")}>
        <Command command={command} />
      </li>
    });
    return <ul className="command-list">{listItems}</ul>;
  }
}

export default CommandList;