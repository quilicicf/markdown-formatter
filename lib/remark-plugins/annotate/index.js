const _ = require('lodash');

const computeRelativeOffset = require('./computeRelativeOffset');

const isInRange = require('../../isInRange');
const {
  NAME_SPACE,
  DEPTH,
  CONTAINS_CURSOR,
  IS_CURSOR_AT_END,
  IS_CURSOR_JUST_BEFORE_START,
  CURSOR_RELATIVE_OFFSET,
} = require('../../constants');

const recursiveAnnotateNodes = (nodes, cursorPosition, depth = 1) => {
  const STATE = {
    hasFoundCursor: false,
  };
  _.each(nodes, (node) => {
    _.set(node, [ NAME_SPACE, DEPTH ], depth);

    const startPosition = node.position.start.offset;

    if (startPosition > cursorPosition
      && depth === 1
      && !STATE.hasFoundCursor) {
      STATE.hasFoundCursor = true;
      _.set(node, [ NAME_SPACE, CONTAINS_CURSOR ], true);
      _.set(node, [ NAME_SPACE, IS_CURSOR_JUST_BEFORE_START ], true);

    } else {
      const endPosition = node.position.end.offset;
      const isCursorInsideNode = isInRange(cursorPosition, { min: startPosition, max: endPosition });
      const isCursorAtEnd = cursorPosition === endPosition;

      STATE.hasFoundCursor = STATE.hasFoundCursor || isCursorInsideNode;
      _.set(node, [ NAME_SPACE, CONTAINS_CURSOR ], isCursorInsideNode);
      _.set(node, [ NAME_SPACE, IS_CURSOR_AT_END ], isCursorAtEnd);

      if (isCursorInsideNode) {
        const relativeOffset = computeRelativeOffset(isCursorInsideNode, startPosition, endPosition, cursorPosition);
        _.set(node, [ NAME_SPACE, CURSOR_RELATIVE_OFFSET ], relativeOffset);
      }
    }

    recursiveAnnotateNodes(node.children, cursorPosition, depth + 1);
  });
};

module.exports = (options) => {
  const { cursorPosition } = options;
  return cursorPosition ? tree => recursiveAnnotateNodes(tree.children, cursorPosition) : _.noop;
};
