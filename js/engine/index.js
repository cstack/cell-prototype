var opCodes = [
  "ACTIVATE",
  "DIE",
  "JUMP",
  "JUMP_IF_TRUE",
  "LABEL",
  "SENSE_CELL",
  "SLEEP",
  "SPLIT",
  "SUPPRESS",
];

function parse(programString) {
  var lines = programString.split("\n");
  var nonEmptyLines = lines.filter(function(line){
    return line.length > 0;
  });

  var commands = [];
  var errors = [];
  nonEmptyLines.forEach(function(line) {
    var parts = line.split(" ");
    var color = parts[0];
    var opCode = parts[1];
    var parameters = parts.slice(2,parts.length);

    var command = {};

    if (opCodes.indexOf(opCode) > -1) {
      command.opCode = opCode;
    } else {
      errors.push(`Unknown op code ${opCode}`);
      return;
    }

    command.parameters = parameters;

    commands.push(command);
  });

  return {
    success: errors.length == 0,
    program: commands,
    errors: errors,
  };
}

exports.CellEngine = {
  parse: parse,
  simulate: function(program) {
    return {
      states: [],
    };
  },
  judge: function(simulation, target) {
    return {
      solution: true,
      stable: true,
      cycles: 1,
    };
  },
};