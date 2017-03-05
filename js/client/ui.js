function createSidebar() {
  var sidebarRoot = document.createElement("div");
  sidebarRoot.setAttribute("id", "sidebar");

  return sidebarRoot;
}

function createGrid() {
  var gridRoot = document.createElement("div");
  gridRoot.setAttribute("id", "grid");

  for (var i = 0; i < 9; i++) {
    var row = document.createElement("div");
    row.classList.add("grid-row");

    for (var j = 0; j < 9; j++) {
      var space = document.createElement("grid-space");
      space.classList.add("grid-space");
      row.appendChild(space);
    }

    gridRoot.appendChild(row);
  }

  return gridRoot;
}

var CellUI = {
  create: function() {
    var UIRoot = document.createElement("div");
    UIRoot.setAttribute("id", "cell-root");

    var grid = createGrid();
    var sidebar = createSidebar();

    UIRoot.appendChild(grid);
    UIRoot.appendChild(sidebar);

    return UIRoot;
  }
};

exports.CellUI = CellUI;
