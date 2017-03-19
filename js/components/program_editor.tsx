import * as React from "react";
import * as Engine from "../engine";

interface ProgramEditorProps {
  programText: string,
  handleUpdatedProgram: (program: Engine.Program, programText: string) => void,
};
interface ProgramEditorState {
  value: string,
};

class ProgramEditor extends React.Component<ProgramEditorProps, ProgramEditorState> {
  constructor(props: ProgramEditorProps) {
    super(props);
    this.state = {value: props.programText};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return <form id="program-editor-form" onSubmit={this.handleSubmit}>
      <textarea id="program-editor-textbox" onChange={this.handleChange} value={this.state.value} />
      <button className="big-button">Run Program</button>
    </form>;
  }
  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    let programText: string = this.state.value;
    let parseResult: Engine.ParseResult = Engine.parse(programText);
    if (parseResult.success) {
      this.props.handleUpdatedProgram(parseResult.program, programText);
    } else {
      alert(`Parse errors: ${parseResult.errors}`);
    }
    event.preventDefault();
  }
}

export default ProgramEditor;