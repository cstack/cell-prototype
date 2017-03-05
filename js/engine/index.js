const COLORS = [
  'B',
  'G',
  'O',
  'P',
  'R',
  'Y',
];

const DIRECTIONS = [
  'DOWN',
  'LEFT',
  'RIGHT',
  'UP',
];

colorParamter = {
  name: 'color',
  test: function(param) {
    return COLORS.indexOf(param) > -1;
  }
}

colorOrColorlessParamter = {
  name: 'color',
  test: function(param) {
    return colorParamter.test(param) || param == "-";
  }
}

directionParamter = {
  name: 'direction',
  test: function(param) {
    return DIRECTIONS.indexOf(param) > -1;
  }
}

directionOrSelfParamter = {
  name: 'directionOrSelf',
  test: function(param) {
    return directionParamter.test(param) || param == "SELF";
  }
}

stringParamter = {
  name: 'string',
  test: function(param) {
    return typeof(param) == "string";
  }
}

const OP_CODES = {
  ACTIVATE: [directionOrSelfParamter, colorParamter],
  DIE: [],
  JUMP: [stringParamter],
  JUMP_IF_TRUE: [stringParamter],
  LABEL: [stringParamter],
  SENSE_CELL: [directionParamter],
  SLEEP: [],
  SPLIT: [directionParamter],
  SUPPRESS: [directionOrSelfParamter, colorParamter],
};

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

    if (colorOrColorlessParamter.test(color)) {
      command.color = color;
    } else {
      errors.push(`Unknown color ${color}`);
      return;
    }

    if (Object.keys(OP_CODES).indexOf(opCode) > -1) {
      command.opCode = opCode;
    } else {
      errors.push(`Unknown op code ${opCode}`);
      return;
    }

    var expectedParamters = OP_CODES[opCode];
    if (parameters.length != expectedParamters.length) {
      errors.push(`${opCode} expected ${expectedParamters.length} parameters but received ${parameters.length}`);
      return;
    }

    for (var i = 0; i < expectedParamters.length; i++) {
      if (!expectedParamters[i].test(parameters[i])) {
        errors.push(`parameter ${i} for ${opCode} should be a ${expectedParamters[i].name}`);
        return;
      }
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