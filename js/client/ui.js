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

function createSidebar() {
  var sidebarRoot = document.createElement("div");
  sidebarRoot.setAttribute("id", "sidebar");

  var editor = createProgramEditor();
  sidebarRoot.appendChild(editor);

  return sidebarRoot;
}

function Sidebar(model) {
  // var editor = createProgramEditor();
  // sidebarRoot.appendChild(editor);

  // return sidebarRoot;

  return React.createElement(
    "div",
    {id: "sidebar"},
    []
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
      React.createElement(Sidebar, Object.assign({key: 'sidebar'}, model.program))
    ]
  );
};

exports.CellUI = CellUI;
