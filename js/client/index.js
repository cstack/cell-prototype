const CellEngine = require('engine').CellEngine;
const CellUI = require('./ui').CellUI;

function createGridModel() {
  var numRows = 9;
  var numCols = 9;

  var rows = [];
  for (var rowNum = 0; rowNum < numRows; rowNum++) {
    var row = []
    for (var rowCol = 0; rowCol < numCols; rowCol++) {
      row.push(false);
    }
    rows.push(row);
  }
  rows[4][4] = true;

  var data = {
    rows: rows,
  }

  var notifyListener = function(callback) {
    callback(data);
  }

  var listeners = [];
  return {
    addListener: function(callback) {
      listeners.push(callback);
      notifyListener(callback);
    },
    notifyListeners: function() {
      listeners.forEach(notifyListener);
    }
  }
}

(function() {
  var gridModel = createGridModel();
  var UIRoot = CellUI.create(gridModel);
  document.body.appendChild(UIRoot);
})();
