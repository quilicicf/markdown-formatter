const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');

const toc = require('./tocPlugin');
const stringifyOptions = require('./stringifyOptions');

module.exports = async sourceMarkdownString => new Promise((resolve, reject) => {
  unified()
    .use(parse)
    .use(toc)
    .use(stringify, stringifyOptions)
    .process(sourceMarkdownString, (error, result) => {
      if (error) { reject(error); }
      return resolve(result.contents);
    });
});
