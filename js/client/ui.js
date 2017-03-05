const React = require('react');
const CellEngine = require('engine').CellEngine;

class ProgramEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.programText};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return React.createElement(
      "form",
      {key: "program-editor-form", id: "program-editor-form", onSubmit: this.handleSubmit},
      [
        React.createElement(
          "textarea",
          {key: "program-editor-textbox", id: "program-editor-textbox", onChange: this.handleChange, value: this.state.value}
        ),
        React.createElement(
          "button",
          {key: "program-editor-submit", className: "big-button"},
          ["Run Program"]
        )
      ]
    );
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    var programText = this.state.value;
    var parseResult = CellEngine.parse(programText);
    if (parseResult.success) {
      this.props.handleUpdatedProgram(parseResult.program, programText);
    } else {
      alert(`Parse errors: ${parseResult.errors}`);
    }
    event.preventDefault();
  }
}

function CellDetail(model) {
  return React.createElement(
    "div",
    {id: "cell-detail"},
    [
      "CellDetail"
    ]
  );
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEditingProgram: true};
    this.handleUpdatedProgram = this.handleUpdatedProgram.bind(this);
  }
  render() {
    var children = [];
    if (this.state.isEditingProgram) {
      children.push(React.createElement(
        ProgramEditor,
        {
          key: `program-editor`,
          programText: this.props.programText,
          handleUpdatedProgram: this.handleUpdatedProgram
        }
      ));
    } else {
      children.push(React.createElement(CellDetail, {key: `cell-detail`, focusedSpace: this.props.focusedSpace}));
    }

    return React.createElement(
      "div",
      {id: "sidebar"},
      children
    );
  }
  handleUpdatedProgram() {
    this.setState({
      isEditingProgram: false
    });
  }
}

function BoardSpace(model) {
  classNames = ["board-space"];
  if (model.containsCell) {
    classNames.push("board-space-cell");
  } else {
    classNames.push("board-space-empty");
  }
  return React.createElement(
    "div",
    {className: classNames.join(" ")}
  );
}

function BoardRow(model) {
  return React.createElement(
    "div",
    {className: "board-row"},
    model.spaces.map(function(space, i) {
      return React.createElement(BoardSpace, Object.assign({key: `board-space-${model.rowNum}-${i}`}, space));
    })
  );
}

function Board(model) {
  return React.createElement(
    "div",
    {id: "board"},
    model.rows.map(function(row, i) {
      return React.createElement(BoardRow, Object.assign({key: `board-row-${i}`, rowNum: i}, row));
    })
  );
}

function CellUI(model) {
  return React.createElement(
    "div",
    {},
    [
      React.createElement(Board, Object.assign({key: 'board'}, model.board)),
      React.createElement(Sidebar, {key: 'sidebar', programText: model.programText, isEditingProgram: true})
    ]
  );
};

exports.CellUI = CellUI;
