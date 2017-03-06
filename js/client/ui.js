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

function Command(props) {
  var string = "";
  string += `${props.command.color} ${props.command.opCode}`;
  if (props.command.parameters.length > 0) {
    string += " " + props.command.parameters.join(" ");
  }
  return React.createElement(
    "li",
    {},
    [string]
  );
}

function CommandList(props) {
  return React.createElement(
    "ul",
    {},
    props.commands.map(function(command, i) {
      return React.createElement(
        "li",
        {key: `command-list-${i}`},
        [
          React.createElement(
            Command,
            {key: "command-list-${i}-command", command: command}
          )
        ]
      );
    })
  );
}

function CellDetail(props) {
  var children = [];
  if (props.focusedSpace === undefined || props.focusedSpace.commands === undefined) {
    children.push(React.createElement("p", {key: "cell-detail-null-state"}, ["Select a cell for more details"]));
  } else {
    children.push(React.createElement(CommandList, {key: `command-list`, commands: props.focusedSpace.commands}));
  }
  return React.createElement(
    "div",
    {id: "cell-detail", key: "cell-detail"},
    children
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

function BoardSpace(props) {
  classNames = ["board-space"];
  if (props.space.containsCell) {
    classNames.push("board-space-cell");
  } else {
    classNames.push("board-space-empty");
  }
  if (props.focused) {
    classNames.push("board-space-focused");
  }
  return React.createElement(
    "div",
    {className: classNames.join(" "), onClick: props.onClick}
  );
}

function BoardRow(props) {
  return React.createElement(
    "div",
    {className: "board-row"},
    props.row.spaces.map(function(space, colNum) {
      var onClick = function() {
        props.onClick(colNum);
      }
      var focused = (props.focusedColNum === colNum);
      return React.createElement(BoardSpace, {key: `board-space-${props.rowNum}-${colNum}`,space: space, onClick: onClick, focused: focused});
    })
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "div",
      {id: "board"},
      this.props.board.rows.map((row, rowNum) => {
        var onClick = (colNum) => {
          this.props.onSpaceSelected(rowNum, colNum);
        }
        var focusedColNum = undefined;
        if (this.props.focusedCoordinates[0] === rowNum) {
          focusedColNum = this.props.focusedCoordinates[1]
        }
        return React.createElement(BoardRow, {key: `board-row-${rowNum}`, rowNum: rowNum, row: row, onClick: onClick, focusedColNum: focusedColNum});
      })
    );
  }
}

class CellUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {focusedCoordinates: [4,4]};
    this.onSpaceSelected = this.onSpaceSelected.bind(this);
  }
  render() {
    var focusedSpace = undefined;
    if (this.state.focusedCoordinates !== undefined) {
      focusedSpace = this.props.board.rows[this.state.focusedCoordinates[0]].spaces[this.state.focusedCoordinates[1]];
    }

    return React.createElement(
      "div",
      {},
      [
        React.createElement(Board, {key: 'board', board: this.props.board, onSpaceSelected: this.onSpaceSelected, focusedCoordinates: this.state.focusedCoordinates}),
        React.createElement(Sidebar, {key: 'sidebar', programText: this.props.programText, isEditingProgram: true, focusedSpace: focusedSpace})
      ]
    );
  }
  onSpaceSelected(rowNum, colNum) {
    this.setState({focusedCoordinates: [rowNum, colNum]});
  }
};

exports.CellUI = CellUI;
