module.exports = (isCursorInsideNode, startPosition, endPosition, cursorPosition) => (
  isCursorInsideNode
    ? cursorPosition - startPosition
    : endPosition - startPosition
);
