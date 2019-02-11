const _ = require('lodash');

module.exports = (newCursorPosition, newFileContent) => {
  const positionFinder = _.reduce(
    newFileContent.split('\n'),
    (seed, line) => {
      if (seed.lineNumber < newCursorPosition.line) {
        return {
          offset: seed.offset + _.size(line) + 1, // Trailing line break
          lineNumber: seed.lineNumber + 1,
        };
      }

      if (seed.lineNumber === newCursorPosition.line) {
        return {
          offset: seed.offset + newCursorPosition.column,
          lineNumber: seed.lineNumber + 1,
        };
      }

      return seed;
    },
    { offset: 0, lineNumber: 1 },
  );
  return positionFinder.offset;
};
