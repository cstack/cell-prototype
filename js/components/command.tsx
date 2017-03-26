import * as React from "react";
import * as Engine from "../engine";

interface CommandProps {
  command: Engine.Command,
};
interface CommandState {
};

class Command extends React.Component<CommandProps, CommandState> {
  constructor(props: CommandProps) {
    super(props);
  }
  render() {
    return React.createElement(
      "span",
      {},
      [Engine.commandToString(this.props.command)]
    );
  }
}

export default Command;