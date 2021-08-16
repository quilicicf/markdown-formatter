export const homePage = 'https://github.com/quilicicf/markdown-formatter'; // NOTE: must be the same as in package.json
export const bugPage = 'https://github.com/quilicicf/markdown-formatter/issues'; // NOTE: must be the same as in package.json

export const DEFAULT_TOC_OPTIONS = { min: 2, max: 4 };
export const TOC_START_MATCHER = /^<!-- TOC START(.*) -->$/;
export const TOC_END_MATCHER = /^<!-- TOC END(.*) -->$/;

export const WATERMARK_VALUES = {
  NONE: 'none',
  TOP: 'top',
  TOC: 'toc',
};

export const WATERMARK_TOP = `<!-- Formatted by ${homePage} -->`;
export const WATERMARK_TOC = `<!-- TOC END: Formatted by ${homePage} -->`;

export const DEFAULT_MARKDOWN_FORMATTER_OPTIONS = {
  watermark: WATERMARK_VALUES.NONE,
};

export const DEFAULT_STRINGIFY_OPTIONS = {
  bullet: '*',
  emphasis: '_',
  fences: true,
  gfm: true,
  listItemIndent: '1',
  rule: '-',
  ruleSpaces: false,
  strong: '_',
};
