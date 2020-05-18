const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');

const tocPlugin = require('./remark-plugins/toc');
const { DEFAULT_STRINGIFY_OPTIONS } = require('./constants');

module.exports = async (sourceMarkdownString, cliStringifyOptions) => new Promise((resolve, reject) => {
  const stringifyOptions = cliStringifyOptions || DEFAULT_STRINGIFY_OPTIONS;

  unified()
    .use(parse)
    .use(tocPlugin)
    .use(stringify, stringifyOptions)
    .process(sourceMarkdownString, (error, result) => {
      if (error) { reject(error); }
      return resolve(result);
    });
});
