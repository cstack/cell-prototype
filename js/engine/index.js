exports.CellEngine = {
  parse: function(programString) {
    return {
      success: true,
      program: {},
    };
  },
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