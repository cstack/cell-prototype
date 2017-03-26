import * as React from "react";
import * as Engine from "../engine";
import Command from "./command";

interface CommandListProps {
  commands: Array<Engine.Command>,
};
interface CommandListState {
};

class CommandList extends React.Component<CommandListProps, CommandListState> {
  constructor(props: CommandListProps) {
    super(props);
  }
  render() {
    let listItems = this.props.commands.map((command, i) => 
      <li key={`command-list-${i}`}>
        <Command command={command} />
      </li>
    );
    return <ul>{listItems}</ul>;
  }
}

export default CommandList;