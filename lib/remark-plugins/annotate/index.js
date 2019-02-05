const _ = require('lodash');

const computeRelativeOffset = require('./computeRelativeOffset');

const isInRange = require('../../isInRange');
const {
  NAME_SPACE,
  CONTAINS_CURSOR,
  IS_CURSOR_AT_END,
  IS_CURSOR_JUST_AFTER_END,
  CURSOR_RELATIVE_OFFSET,
} = require('../../constants');

const annotateNodes = (nodes, cursorPosition) => {
  _.each(nodes, (node) => {
    const startPosition = node.position.start.offset;
    const endPosition = node.position.end.offset;
    const isCursorInsideNode = isInRange(cursorPosition, { min: startPosition, max: endPosition });
    const isCursorAtEnd = cursorPosition === endPosition;
    const isCursorJustAfterEnd = cursorPosition === endPosition + 1;

    _.set(node, [ NAME_SPACE, CONTAINS_CURSOR ], isCursorInsideNode);
    _.set(node, [ NAME_SPACE, IS_CURSOR_AT_END ], isCursorAtEnd);
    _.set(node, [ NAME_SPACE, IS_CURSOR_JUST_AFTER_END ], isCursorJustAfterEnd);

    const relativeOffset = computeRelativeOffset(isCursorInsideNode, startPosition, endPosition, cursorPosition);
    _.set(node, [ NAME_SPACE, CURSOR_RELATIVE_OFFSET ], relativeOffset);
  });
};

module.exports = (options) => {
  const { cursorPosition } = options;
  return cursorPosition ? tree => annotateNodes(tree.children, cursorPosition) : _.noop;
};
