/**
 * This file is written in TS and transpiled to JS because it's the only way I found to validate
 * that the stringification options defaults are valid against their TS definition in mdast-util-to-markdown.
 *
 * Ensuring all the defaults are defined allows automating the process of auto-generating settings for
 * each editor for which a formatter plugin is created based on this project.
 *
 * I can now be sure that defaults contain all possible options (or the build breaks when running validate-defaults).
 *
 * This allows me to make sure there is a textual description and JSON schema for each option that I can use
 * to generate the settings for the downstream editor plugins, all automated.
 */

import { Options as RemarkStringifyOptions } from 'remark-stringify';

// eslint-disable-next-line import/no-unresolved
import { MarkdownFormatterOptions, WatermarkType } from '../types';

export const homePage: string = 'https://github.com/quilicicf/markdown-formatter'; // NOTE: must be the same as in package.json
export const bugPage: string = 'https://github.com/quilicicf/markdown-formatter/issues'; // NOTE: must be the same as in package.json

export const DEFAULT_TOC_OPTIONS: { min: number, max: number } = { min: 2, max: 4 };
export const TOC_START_MATCHER: RegExp = /^<!-- TOC START(.*) -->$/;
export const TOC_END_MATCHER: RegExp = /^<!-- TOC END(.*) -->$/;

export const WATERMARK_VALUES: { NONE: WatermarkType, TOP: WatermarkType, TOC: WatermarkType } = {
  NONE: 'none',
  TOP: 'top',
  TOC: 'toc',
};

export const WATERMARK_TOP: string = `<!-- Formatted by ${homePage} -->`;
export const WATERMARK_TOC: string = `<!-- TOC END: Formatted by ${homePage} -->`;

export const DEFAULT_MARKDOWN_FORMATTER_OPTIONS: MarkdownFormatterOptions = {
  watermark: WATERMARK_VALUES.NONE,
};

// eslint-disable-next-line no-undef
export const DEFAULT_STRINGIFY_OPTIONS: Required<RemarkStringifyOptions> = {
  listItemIndent: 'one',

  bullet: '*',
  bulletOther: undefined,

  bulletOrdered: '.',
  bulletOrderedOther: undefined,
  incrementListMarker: true,

  strong: '_',
  emphasis: '_',

  fences: true,
  fence: '`',

  rule: '-',
  ruleRepetition: 3,
  ruleSpaces: false,

  quote: '"',
  setext: false,
  closeAtx: false,
  resourceLink: false,

  tightDefinitions: false,
  extensions: undefined,
  handlers: undefined,
  join: undefined,
  unsafe: undefined,
};
