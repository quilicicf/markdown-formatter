const _ = require('lodash');

const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');

const tocPlugin = require('./remark-plugins/toc');
const annotatePlugin = require('./remark-plugins/annotate');
const cursorPlugin = require('./remark-plugins/cursor');
const { STRINGIFY_OPTIONS } = require('./constants');

const computeNewCursorOffset = (newCursorPosition, newFileContent) => {
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

module.exports = async (sourceMarkdownString, cursorOffset = undefined) => new Promise((resolve, reject) => {
  const annotationOptions = { cursorPosition: cursorOffset, newCursorPosition: { line: 0, column: 0 } };

  unified()
    .use(parse)
    .use(annotatePlugin, annotationOptions)
    .use(tocPlugin)
    .use(stringify, STRINGIFY_OPTIONS)
    .use(cursorPlugin, annotationOptions)
    .process(sourceMarkdownString, (error, result) => {
      if (error) { reject(error); }
      const newCursorOffset = computeNewCursorOffset(annotationOptions.newCursorPosition, result.contents);
      return resolve({
        ...result,
        newCursorPosition: { position: annotationOptions.newCursorPosition, offset: newCursorOffset },
      });
    });
});
