const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const toc = require('./tocPlugin');

module.exports = async sourceMarkdownString => new Promise((resolve, reject) => {
  unified()
    .use(parse)
    .use(toc)
    .use(stringify, {
      gfm: true,
      bullet: '*',
      listItemIndent: '1',
      rule: '-',
      ruleSpaces: false,
      strong: '_',
      emphasis: '_',
    })
    .process(sourceMarkdownString, (error, result) => {
      if (error) { reject(error); }
      return resolve(result.contents);
    });
});
