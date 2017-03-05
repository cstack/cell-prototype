const React = require('react');

function createProgramEditor() {
  var editorRoot = document.createElement("div");
  editorRoot.setAttribute("id", "program-editor");

  var textBox = document.createElement("textarea");
  textBox.setAttribute("id", "program-text-box");
  textBox.textContent = "- SPLIT UP\n- SPLIT DOWN";
  editorRoot.appendChild(textBox);

  var runButton = document.createElement("button");
  runButton.classList.add("big-button");
  runButton.textContent = "Run";
  editorRoot.appendChild(runButton);

  return editorRoot
}

function RunButton(model) {
  return React.createElement(
    "button",
    {className: "big-button"},
    ["Run"]
  )
}

function ProgramTextBox(model) {
  return React.createElement(
    "textarea",
    {id: "program-editor-textbox"},
    [model.programText]
  )
}

function ProgramEditor(model) {
  var textBox = React.createElement("textarea", {key: "program-editor-textbox", id: "program-editor-textbox"});
  return React.createElement(
    "div",
    {id: "program-editor"},
    [
      React.createElement(ProgramTextBox, {key: "program-editor-textbox", programText: model.programText}),
      React.createElement(RunButton, {key: "run-button"})
    ]
  );
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

function Sidebar(model) {
  children = [];
  if (model.isEditingProgram) {
    children.push(React.createElement(ProgramEditor, {key: `program-editor`, programText: model.programText}));
  } else {
    children.push(React.createElement(CellDetail, {key: `cell-detail`, focusedSpace: model.focusedSpace}));
  }

  return React.createElement(
    "div",
    {id: "sidebar"},
    children
  );
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
