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

function createGrid(gridModel) {
  var gridRootElement = document.createElement("div");
  gridRootElement.setAttribute("id", "grid");

  var numRows = 9;
  var numCols = 9;

  var gridSpaceElements = [];
  for (var i = 0; i < numRows; i++) {
    var rowElement = document.createElement("div");
    rowElement.classList.add("grid-row");

    var rowSpaceElements = [];
    for (var j = 0; j < numCols; j++) {
      var spaceElement = document.createElement("grid-space");
      spaceElement.classList.add("grid-space");
      rowElement.appendChild(spaceElement);
      rowSpaceElements.push(spaceElement);
    }

    gridRootElement.appendChild(rowElement);
    gridSpaceElements.push(rowSpaceElements);
  }

  gridModel.addListener(function(gridModel) {
    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        var spaceElement = gridSpaceElements[row][col];
        if (gridModel.rows[row][col]) {
          spaceElement.classList.remove("grid-space-empty");
          spaceElement.classList.add("grid-space-cell");
        } else {
          spaceElement.classList.remove("grid-space-cell");
          spaceElement.classList.add("grid-space-empty");
        }
      }
    }
  });

  return gridRootElement;
}

var CellUI = {
  create: function(gridModel) {
    var UIRoot = document.createElement("div");
    UIRoot.setAttribute("id", "cell-root");

    var grid = createGrid(gridModel);
    var sidebar = createSidebar();

    UIRoot.appendChild(grid);
    UIRoot.appendChild(sidebar);

    return UIRoot;
  }
};

exports.CellUI = CellUI;
