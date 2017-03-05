const CellEngine = require('engine').CellEngine;
const CellUI = require('./ui').CellUI;

(function() {
  var UIRoot = CellUI.create();
  document.body.appendChild(UIRoot);
})();
