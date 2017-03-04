var parse = require("../index.js").CellEngine.parse;

var expect = require("chai").expect;
var fs = require('fs');
var path = require('path');

function bufferFile(relPath) {
  return fs.readFileSync(path.join(__dirname, relPath), "utf-8"); // zzzz....
}

describe("CellEngine.parse  ", function() {
  it("parses an empty file", function() {
    var programText = "";
    var result = parse(programText);

    expect(result).to.deep.equal({
      success: true,
      errors: [],
      program: [],
    });
  });

  it("parses every op code", function() {
    var programText = bufferFile("fixtures/all_op_codes.cell");
    var result = parse(programText);

    expect(result).to.deep.equal({
      success: true,
      errors: [],
      program: [
        {
          opCode: "ACTIVATE",
          parameters: ["UP", "R"],
        },
        {
          opCode: "DIE",
          parameters: [],
        },
        {
          opCode: "JUMP",
          parameters: ["test"],
        },
        {
          opCode: "JUMP_IF_TRUE",
          parameters: ["test"],
        },
        {
          opCode: "LABEL",
          parameters: ["test"],
        },
        {
          opCode: "SENSE_CELL",
          parameters: ["UP"],
        },
        {
          opCode: "SLEEP",
          parameters: [],
        },
        {
          opCode: "SPLIT",
          parameters: ["UP"],
        },
        {
          opCode: "SUPPRESS",
          parameters: ["UP", "R"],
        },
      ],
    });
  });

  it("errors on unrecognized op code", function() {
    var programText = "- UNKNOWN_OP_CODE"
    var result = parse(programText);

    expect(result).to.deep.equal({
      success: false,
      errors: ["Unknown op code UNKNOWN_OP_CODE"],
      program: [],
    });
  });
});