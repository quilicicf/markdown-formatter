import { unified } from 'unified';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import stringify from 'remark-stringify';
import remarkFrontmatter from 'remark-frontmatter';

import tocPlugin from './remark-plugins/toc/index.js';
import watermarkPlugin from './remark-plugins/watermarkPlugin/index.js';
import { DEFAULT_MARKDOWN_FORMATTER_OPTIONS, DEFAULT_STRINGIFY_OPTIONS } from './constants.js';

export default async (sourceString, parameterMarkdownFormatterOptions = {}, parameterStringifyOptions = {}) => {
  const markdownFormatterOptions = {
    ...DEFAULT_MARKDOWN_FORMATTER_OPTIONS,
    ...parameterMarkdownFormatterOptions,
  };
  const stringifyOptions = {
    ...DEFAULT_STRINGIFY_OPTIONS,
    ...parameterStringifyOptions,
  };

  return unified()
    .use(parse)
    .use(gfm)
    .use(tocPlugin)
    .use(watermarkPlugin(markdownFormatterOptions.watermark))
    .use(remarkFrontmatter, [ 'yaml', 'toml' ])
    .use(stringify, stringifyOptions)
    .process(sourceString);
};
