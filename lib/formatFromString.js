import unified from 'unified';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import stringify from 'remark-stringify';

import tocPlugin from './remark-plugins/toc';
import watermarkPlugin from './remark-plugins/watermarkPlugin';
import { DEFAULT_MARKDOWN_FORMATTER_OPTIONS, DEFAULT_STRINGIFY_OPTIONS } from './constants';

export default async (sourceString, parameterMarkdownFormatterOptions = {}, parameterStringifyOptions = {}) => (
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
      .use(gfm)
      .use(tocPlugin)
      .use(watermarkPlugin(markdownFormatterOptions.watermark))
      .use(stringify, stringifyOptions)
      .process(sourceString, (error, result) => {
        if (error) { reject(error); }
        return resolve(result);
      });
  })
);
