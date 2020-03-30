const _ = require('lodash');

const updateState = require('./updateState');
const setPositionFromState = require('./setPositionFromState');
const createVisitorWithoutArgMessage = require('./createVisitorWithoutArgMessage');
const {
  NAME_SPACE,
  DEPTH,
  CONTAINS_CURSOR,
  IS_CURSOR_AT_END,
  IS_CURSOR_JUST_BEFORE_START,
  CURSOR_RELATIVE_OFFSET,
} = require('../../constants');

/**
 * Special case because the padding option adds characters to the line
 * which complicates positioning of the cursor.
 */
const handleTable = (tableNode, stringifiedNode, options, STATE) => {
  const insidePosition = _.reduce(
    tableNode.children,
    (seed, tableRowNode) => {
      if (seed.hasMatched) { return seed; }

      const annotation = tableRowNode[ NAME_SPACE ];
      if (!annotation[ CONTAINS_CURSOR ]) {
        return { line: seed.line + 1, column: -1, hasMatched: false };
      }

      if (annotation[ IS_CURSOR_AT_END ]) {
        // TODO: compute real end of line
        return { line: seed.line, column: annotation[ CURSOR_RELATIVE_OFFSET ], hasMatched: true };
      }

      if (annotation[ IS_CURSOR_JUST_BEFORE_START ]) {
        return { line: seed.line - 1, column: 0, hasMatched: true };
      }

      return { line: seed.line, column: annotation[ CURSOR_RELATIVE_OFFSET ], hasMatched: true };
    },
    { line: 1, column: -1, hasMatched: false },
  );

  updateState(STATE, {
    newCursorLine: STATE.newCursorLine + insidePosition.line,
    newCursorColumn: insidePosition.column,
    hasFoundNewCursorPosition: true,
  });
  setPositionFromState(options, STATE);
  return stringifiedNode;
};

module.exports = (originalVisitor, file, options, STATE) => {
  if (originalVisitor.name === 'root') {
    return originalVisitor;
  }

  function cursorPositionUpdater (...args) {
    const [ node ] = args;
    const stringifiedNode = originalVisitor.apply(this, args);

    const isTooDeepToBeConsidered = _.get(node, [ NAME_SPACE, DEPTH ]) > 1;
    if (STATE.hasFoundNewCursorPosition || isTooDeepToBeConsidered) { return stringifiedNode; }

    if (_.isEmpty(args)) {
      file.message(createVisitorWithoutArgMessage(originalVisitor.name));
      return stringifiedNode;
    }

    const annotation = node[ NAME_SPACE ] || {};
    const stringifiedNodeLines = stringifiedNode.split('\n');
    const stringifiedNodeLastLine = _.last(stringifiedNodeLines);
    const stringifiedNodeLinesNumber = _.size(stringifiedNodeLines);

    if (!annotation[ CONTAINS_CURSOR ]) {
      updateState(STATE, {
        newCursorLine: STATE.newCursorLine + stringifiedNodeLinesNumber + 1, // Tailing \n
      });
      return stringifiedNode;
    }

    if (originalVisitor.name === 'table') { // Tables are an especially tricky case
      return handleTable(node, stringifiedNode, options, STATE);
    }

    if (annotation[ IS_CURSOR_AT_END ]) {
      updateState(STATE, {
        newCursorLine: (STATE.newCursorLine + stringifiedNodeLinesNumber) - 1,
        newCursorColumn: _.size(stringifiedNodeLastLine),
        hasFoundNewCursorPosition: true,
      });
      setPositionFromState(options, STATE);
      return stringifiedNode;
    }

    if (annotation[ IS_CURSOR_JUST_BEFORE_START ]) {
      updateState(STATE, {
        newCursorLine: STATE.newCursorLine - 1,
        newCursorColumn: 0,
        hasFoundNewCursorPosition: true,
      });
      setPositionFromState(options, STATE);
      return stringifiedNode;
    }

    updateState(STATE, {
      newCursorLine: (STATE.newCursorLine + stringifiedNodeLinesNumber) - 1,
      newCursorColumn: annotation[ CURSOR_RELATIVE_OFFSET ],
      hasFoundNewCursorPosition: true,
    });
    setPositionFromState(options, STATE);
    return stringifiedNode;
  }

  const newFunction = cursorPositionUpdater;
  newFunction.name = originalVisitor.name;
  newFunction.length = originalVisitor.length;
  return newFunction;
};
