const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');

const tocPlugin = require('./remark-plugins/toc');
const watermarkPlugin = require('./remark-plugins/watermarkPlugin');
const { DEFAULT_STRINGIFY_OPTIONS, DEFAULT_MARKDOWN_FORMATTER_OPTIONS } = require('./constants');

module.exports = async (sourceString, parameterMarkdownFormatterOptions = {}, parameterStringifyOptions = {}) =>
  new Promise((resolve, reject) => {
    const markdownFormatterOptions = {
      ...DEFAULT_MARKDOWN_FORMATTER_OPTIONS,
      ...parameterMarkdownFormatterOptions,
    };
    const stringifyOptions = {
      ...DEFAULT_STRINGIFY_OPTIONS,
      ...parameterStringifyOptions,
    };

    unified()
      .use(parse)
      .use(tocPlugin)
      .use(watermarkPlugin(markdownFormatterOptions.watermark))
      .use(stringify, stringifyOptions)
      .process(sourceString, (error, result) => {
        if (error) { reject(error); }
        return resolve(result);
      });
  });
