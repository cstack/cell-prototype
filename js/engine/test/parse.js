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
          color: "-",
          opCode: "ACTIVATE",
          parameters: ["UP", "R"],
        },
        {
          color: "-",
          opCode: "DIE",
          parameters: [],
        },
        {
          color: "-",
          opCode: "JUMP",
          parameters: ["test"],
        },
        {
          color: "-",
          opCode: "JUMP_IF_TRUE",
          parameters: ["test"],
        },
        {
          color: "-",
          opCode: "LABEL",
          parameters: ["test"],
        },
        {
          color: "-",
          opCode: "SENSE_CELL",
          parameters: ["UP"],
        },
        {
          color: "-",
          opCode: "SLEEP",
          parameters: [],
        },
        {
          color: "-",
          opCode: "SPLIT",
          parameters: ["UP"],
        },
        {
          color: "-",
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

  it("parses every color", function() {
    var programText = bufferFile("fixtures/all_colors.cell");
    var result = parse(programText);

    expect(result).to.deep.equal({
      success: true,
      errors: [],
      program: [
        {
          color: 'R',
          opCode: 'ACTIVATE',
          parameters: ['UP', 'R'],
        },
        {
          color: 'B',
          opCode: 'ACTIVATE',
          parameters: ['UP', 'B'],
        },
        {
          color: 'G',
          opCode: 'ACTIVATE',
          parameters: ['UP', 'G'],
        },
        {
          color: 'Y',
          opCode: 'ACTIVATE',
          parameters: ['UP', 'Y'],
        },
        {
          color: 'P',
          opCode: 'ACTIVATE',
          parameters: ['UP', 'P'],
        },
        {
          color: 'O',
          opCode: 'ACTIVATE',
          parameters: ['UP', 'O'],
        },
      ],
    });
  });

  it("errors on unrecognized color", function() {
    var programText = "Z ACTIVATE Z"
    var result = parse(programText);

    expect(result).to.deep.equal({
      success: false,
      errors: ["Unknown color Z"],
      program: [],
    });
  });
});