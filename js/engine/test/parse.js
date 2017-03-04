var expect = require("chai").expect;
var parse = require("../index.js").CellEngine.parse;

describe("CellEngine.parse  ", function() {
  it("parses an empty file", function() {
    var programText = "";
    var result = parse(programText);

    expect(result).to.deep.equal({
      program: {},
      success: true,
    });
  });
});