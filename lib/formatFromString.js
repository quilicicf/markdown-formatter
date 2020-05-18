const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');

const tocPlugin = require('./remark-plugins/toc');
const { STRINGIFY_OPTIONS } = require('./constants');

module.exports = async sourceMarkdownString => new Promise((resolve, reject) => {
  unified()
    .use(parse)
    .use(tocPlugin)
    .use(stringify, STRINGIFY_OPTIONS)
    .process(sourceMarkdownString, (error, result) => {
      if (error) { reject(error); }
      return resolve(result);
    });
});
