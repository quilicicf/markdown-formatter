const { homepage } = require('../package.json');

const WATERMARK_VALUES = {
  NONE: 'none',
  TOP: 'top',
  TOC: 'toc',
};

module.exports = {
  DEFAULT_TOC_OPTIONS: { min: 2, max: 4 },
  TOC_START_MATCHER: /^<!-- TOC START(.*) -->$/,
  TOC_END_MATCHER: /^<!-- TOC END(.*) -->$/,

  WATERMARK_VALUES,
  WATERMARK_TOP: `<!-- Formatted by ${homepage} -->`,
  WATERMARK_TOC: `<!-- TOC END: Formatted by ${homepage} -->`,

  DEFAULT_MARKDOWN_FORMATTER_OPTIONS: {
    watermark: WATERMARK_VALUES.NONE,
  },

  DEFAULT_STRINGIFY_OPTIONS: {
    bullet: '*',
    emphasis: '_',
    fences: true,
    gfm: true,
    listItemIndent: '1',
    rule: '-',
    ruleSpaces: false,
    strong: '_',
  },
};
