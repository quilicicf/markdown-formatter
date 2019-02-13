const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');

const computeNewCursorOffset = require('./computeNewCursorOffset');
const tocPlugin = require('./remark-plugins/toc');
const annotatePlugin = require('./remark-plugins/annotate');
const cursorPlugin = require('./remark-plugins/cursor');
const { STRINGIFY_OPTIONS } = require('./constants');

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
        newCursorOffset,
        newCursorPosition: annotationOptions.newCursorPosition,
      });
    });
});
