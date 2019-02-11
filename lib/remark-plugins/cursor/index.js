const _ = require('lodash');

const {
  NAME_SPACE,
  CONTAINS_CURSOR,
  IS_CURSOR_AT_END,
  IS_CURSOR_JUST_AFTER_END,
  CURSOR_RELATIVE_OFFSET,
} = require('../../constants');

const createVisitorWithoutArgMessage = visitorName => (
  `Found a level 1 markdown node whose visitor of type ${visitorName} has no argument.
This can mess with the cursor position in the formatted file.`
);

const setPositionFromState = (options, state) => {
  // eslint-disable-next-line no-param-reassign
  options.newCursorPosition = {
    line: state.newCursorLine,
    column: state.newCursorColumn,
  };
};

module.exports = function constructor (options) {
  const { cursorPosition } = options;
  const { Compiler } = this;
  const { visitors } = Compiler.prototype;

  const STATE = {
    newCursorLine: 1, // Accumulator
    newCursorColumn: undefined, // Set once
    hasFoundNewCursorPosition: false, // Set once
  };

  const updateCursorPosition = (originalVisitor, file) => {
    if (originalVisitor.name === 'root') {
      return originalVisitor;
    }

    function cursorPositionUpdater (...args) {
      const [ node ] = args;
      const stringifiedNode = originalVisitor.apply(this, args);

      const isTooDeepToBeConsidered = node && !_.has(node, [ NAME_SPACE ]); // Only level-1 nodes handled
      if (STATE.hasFoundNewCursorPosition || isTooDeepToBeConsidered) {
        return stringifiedNode;
      }

      if (_.isEmpty(args)) {
        // eslint-disable-next-line no-param-reassign
        // offset += _.size(stringifiedNode);
        file.message(createVisitorWithoutArgMessage(originalVisitor.name));
        return stringifiedNode;
      }

      const stringifiedNodeSize = _.size(stringifiedNode);
      const stringifiedNodeLinesNumber = _.size(stringifiedNode.split('\n')) + 1; // Trailing line break

      if (!_.has(node, [ NAME_SPACE ])) { // Not a level 1 node
        return stringifiedNode;
      }

      const isCursorAtEnd = _.get(node, [ NAME_SPACE, IS_CURSOR_AT_END ]);
      if (isCursorAtEnd) {
        STATE.newCursorColumn = stringifiedNodeSize;
        STATE.hasFoundNewCursorPosition = true;
        setPositionFromState(options, STATE);
        return stringifiedNode;
      }

      const isCursorJustAfterEnd = _.get(node, [ NAME_SPACE, IS_CURSOR_JUST_AFTER_END ]);
      if (isCursorJustAfterEnd) {
        STATE.newCursorColumn = stringifiedNodeSize + 1; // Just after => +1
        STATE.hasFoundNewCursorPosition = true;
        setPositionFromState(options, STATE);
        return stringifiedNode;
      }

      const containsCursor = _.get(node, [ NAME_SPACE, CONTAINS_CURSOR ]);
      if (containsCursor) {
        // Best guess, let's hope formatting did not change the size of the block
        STATE.newCursorColumn = _.get(node, [ NAME_SPACE, CURSOR_RELATIVE_OFFSET ]);
        STATE.hasFoundNewCursorPosition = true;
        setPositionFromState(options, STATE);
        return stringifiedNode;
      }

      STATE.newCursorLine += stringifiedNodeLinesNumber;
      return stringifiedNode;
    }

    const newFunction = cursorPositionUpdater;
    newFunction.name = originalVisitor.name;
    newFunction.length = originalVisitor.length;
    return newFunction;
  };

  function transformer (tree, file) {
    if (cursorPosition) {
      Compiler.prototype.visitors = _.mapValues(
        visitors,
        visitor => updateCursorPosition(visitor, file),
      );
    }
  }

  return transformer;
};
