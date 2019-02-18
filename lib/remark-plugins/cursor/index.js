const _ = require('lodash');

const updateCursorPosition = require('./updateCursorPosition');

module.exports = function constructor (options) {
  const { Compiler } = this;
  const { visitors } = Compiler.prototype;

  const STATE = {
    newCursorLine: 1, // Accumulator
    newCursorColumn: undefined, // Set once
    hasFoundNewCursorPosition: false, // Set once
  };

  function transformer (tree, file) {
    if (options.cursorPosition) {
      _.set( // WARNING: must update parameters to change Compiler behavior
        Compiler,
        [ 'prototype', 'visitors' ],
        _.mapValues(visitors, visitor => updateCursorPosition(visitor, file, options, STATE)),
      );
    }
  }

  return transformer;
};
