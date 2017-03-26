import * as Engine from "../engine";
import { bufferFile } from "./test_utils";

import "mocha"; // Defines "describe", "it"
import { expect } from "chai";

it("parses an empty file", function() {
  let programText = "";
  let result = Engine.parse(programText);

  expect(result).to.deep.equal({
    success: true,
    errors: [],
    program: {
      commands: []
    },
  });
});

it("parses every op code", function() {
  let programText = bufferFile("fixtures/all_op_codes.cell");
  let result = Engine.parse(programText);

  expect(result).to.deep.equal({
    success: true,
    errors: [],
    program: {
      commands: [
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.ACTIVATE,
          parameters: ["UP", "R"],
        },
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.DIE,
          parameters: [],
        },
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.JUMP,
          parameters: ["test"],
        },
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.JUMP_IF_TRUE,
          parameters: ["test"],
        },
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.LABEL,
          parameters: ["test"],
        },
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.SENSE_CELL,
          parameters: ["UP"],
        },
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.SLEEP,
          parameters: [],
        },
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.SPLIT,
          parameters: ["UP"],
        },
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.SUPPRESS,
          parameters: ["UP", "R"],
        },
      ],
    },
  });
});

it("errors on unrecognized op code", function() {
  let programText = "- UNKNOWN_OP_CODE";
  let result = Engine.parse(programText);

  expect(result).to.deep.equal({
    success: false,
    errors: ["Unknown op code UNKNOWN_OP_CODE"],
    program: {
      commands: [],
    },
  });
});

it("parses every color", function() {
  let programText = bufferFile("fixtures/all_colors.cell");
  let result = Engine.parse(programText);

  expect(result).to.deep.equal({
    success: true,
    errors: [],
    program: {
      commands: [
        {
          color: Engine.Color.R,
          opCode: Engine.OpCode.ACTIVATE,
          parameters: ['UP', 'R'],
        },
        {
          color: Engine.Color.B,
          opCode: Engine.OpCode.ACTIVATE,
          parameters: ['UP', 'B'],
        },
        {
          color: Engine.Color.G,
          opCode: Engine.OpCode.ACTIVATE,
          parameters: ['UP', 'G'],
        },
        {
          color: Engine.Color.Y,
          opCode: Engine.OpCode.ACTIVATE,
          parameters: ['UP', 'Y'],
        },
        {
          color: Engine.Color.P,
          opCode: Engine.OpCode.ACTIVATE,
          parameters: ['UP', 'P'],
        },
        {
          color: Engine.Color.O,
          opCode: Engine.OpCode.ACTIVATE,
          parameters: ['UP', 'O'],
        },
      ],
    }
  });
});

it("errors on unrecognized color", function() {
  let programText = "Z ACTIVATE Z";
  let result = Engine.parse(programText);

  expect(result).to.deep.equal({
    success: false,
    errors: ["Unknown color Z"],
    program: {
      commands: [],
    },
  });
});

it("typechecks number of parameters", function() {
  let programText = "- SPLIT\n- SPLIT UP R";
  let result = Engine.parse(programText);

  expect(result).to.deep.equal({
    success: false,
    errors: [
      "SPLIT expected 1 parameters but received 0",
      "SPLIT expected 1 parameters but received 2",
    ],
    program: {
      commands: [],
    },
  });
});

it("typechecks directional parameters", function() {
  let programText = "- SPLIT UP\n- SPLIT OP\n- SPLIT SELF\n- ACTIVATE SELF R\n";
  let result = Engine.parse(programText);

  expect(result).to.deep.equal({
    success: false,
    errors: [
      "parameter 0 for SPLIT should be a direction",
      "parameter 0 for SPLIT should be a direction",
    ],
    program: {
      commands: [
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.SPLIT,
          parameters: ["UP"],
        },
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.ACTIVATE,
          parameters: ["SELF","R"],
        },
      ],
    }
  });
});

it("typechecks color parameters", function() {
  let programText = "- ACTIVATE UP R\n- ACTIVATE UP Z\n- ACTIVATE UP -";
  let result = Engine.parse(programText);

  expect(result).to.deep.equal({
    success: false,
    errors: [
      "parameter 1 for ACTIVATE should be a color",
      "parameter 1 for ACTIVATE should be a color",
    ],
    program: {
      commands: [
        {
          color: Engine.Color["-"],
          opCode: Engine.OpCode.ACTIVATE,
          parameters: ["UP", "R"],
        },
      ],
    },
  });
});
