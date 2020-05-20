const _ = require('lodash');
const {
  describe, beforeAll, test, expect,
} = require('@jest/globals');

const loadDataSets = require('./loadDataSets');
const { formatFromFile, formatFromString } = require('../index');

const FILE_CONTENTS = {};

const ALTERNATIVE_STRINGIFY_OPTIONS = {
  bullet: '-',
  emphasis: '*',
  fences: false,
  gfm: true,
  listItemIndent: 'tab',
  rule: '_',
  ruleSpaces: true,
  strong: '*',
};

describe('Format & generate ToC', () => {

  beforeAll(() => {
    const dataSets = loadDataSets(FILE_CONTENTS);
    _.assign(FILE_CONTENTS, dataSets);
  });

  test('It should format from string', async () => {
    const { simple: { input, output } } = FILE_CONTENTS;
    const { contents: markdownWithToc } = await formatFromString(input);

    expect(markdownWithToc).toEqual(output);
  });

  test('It should format from file', async () => {
    const { simple: { inputPath, output } } = FILE_CONTENTS;
    const { contents: markdownWithToc } = await formatFromFile(inputPath);

    expect(markdownWithToc).toEqual(output);
  });

  test('It should be idempotent', async () => {
    const { simple: { input } } = FILE_CONTENTS;
    const { contents: markdownFormattedOnce } = await formatFromString(input);
    const { contents: markdownFormattedTwice } = await formatFromString(markdownFormattedOnce);

    expect(markdownFormattedTwice).toEqual(markdownFormattedOnce);
  });

  test('It should use default ToC configuration when undefined', async () => {
    const { default_toc_conf: { input, output } } = FILE_CONTENTS;
    const { contents: formattedMarkdown } = await formatFromString(input);

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should overwrite default stringify options when formatting from string', async () => {
    const { overwritten_stringify_options: { input, output } } = FILE_CONTENTS;
    const { contents: formattedMarkdown } = await formatFromString(input, {}, ALTERNATIVE_STRINGIFY_OPTIONS);

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should overwrite default stringify options when formatting from file', async () => {
    const { overwritten_stringify_options: { inputPath, output } } = FILE_CONTENTS;
    const { contents: formattedMarkdown } = await formatFromFile(inputPath, {}, ALTERNATIVE_STRINGIFY_OPTIONS);

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should add watermark at top', async () => {
    const { watermark_top: { input, output } } = FILE_CONTENTS;
    const { contents: formattedMarkdown } = await formatFromString(input, { watermark: 'top' });

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should not add watermark at top twice', async () => {
    const { watermark_top: { input } } = FILE_CONTENTS;
    const { contents: formattedOnce } = await formatFromString(input, { watermark: 'top' });
    const { contents: formattedTwice } = await formatFromString(formattedOnce, { watermark: 'top' });

    expect(formattedTwice).toEqual(formattedOnce);
  });

  test('It should add watermark in ToC', async () => {
    const { watermark_toc: { input, output } } = FILE_CONTENTS;
    const { contents: formattedMarkdown } = await formatFromString(input, { watermark: 'toc' });

    expect(formattedMarkdown).toEqual(output);
  });
});
