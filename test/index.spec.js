import {
  beforeAll, describe, expect, test,
} from '@jest/globals';

import loadDataSets from './loadDataSets';
import { formatFromFile, formatFromString } from '../index';

let FILE_CONTENTS = {};

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
    FILE_CONTENTS = { ...FILE_CONTENTS, ...dataSets };
  });

  test('It should format from string', async () => {
    const { simple: { input, output } } = FILE_CONTENTS;
    const { value: markdownWithToc } = await formatFromString(input);

    expect(markdownWithToc).toEqual(output);
  });

  test('It should format from file', async () => {
    const { simple: { inputPath, output } } = FILE_CONTENTS;
    const { value: markdownWithToc } = await formatFromFile(inputPath);

    expect(markdownWithToc).toEqual(output);
  });

  test('It should be idempotent', async () => {
    const { simple: { input } } = FILE_CONTENTS;
    const { value: markdownFormattedOnce } = await formatFromString(input);
    const { value: markdownFormattedTwice } = await formatFromString(markdownFormattedOnce);

    expect(markdownFormattedTwice).toEqual(markdownFormattedOnce);
  });

  test('It should use default ToC configuration when undefined', async () => {
    const { default_toc_conf: { input, output } } = FILE_CONTENTS;
    const { value: formattedMarkdown } = await formatFromString(input);

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should overwrite default stringify options when formatting from string', async () => {
    const { overwritten_stringify_options: { input, output } } = FILE_CONTENTS;
    const { value: formattedMarkdown } = await formatFromString(input, {}, ALTERNATIVE_STRINGIFY_OPTIONS);

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should overwrite default stringify options when formatting from file', async () => {
    const { overwritten_stringify_options: { inputPath, output } } = FILE_CONTENTS;
    const { value: formattedMarkdown } = await formatFromFile(inputPath, {}, ALTERNATIVE_STRINGIFY_OPTIONS);

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should add watermark at top', async () => {
    const { watermark_top: { input, output } } = FILE_CONTENTS;
    const { value: formattedMarkdown } = await formatFromString(input, { watermark: 'top' });

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should not add watermark at top twice', async () => {
    const { watermark_top: { input } } = FILE_CONTENTS;
    const { value: formattedOnce } = await formatFromString(input, { watermark: 'top' });
    const { value: formattedTwice, messages } = await formatFromString(formattedOnce, { watermark: 'top' });

    expect(messages).toHaveLength(2);
    const [
      { message: firstMessage },
      { message: secondMessage },
    ] = messages;

    expect(firstMessage).toContain('No ToC start found');
    expect(secondMessage).toContain('Watermark found');

    expect(formattedTwice).toEqual(formattedOnce);
  });

  test('It should remove watermark at top if watermark type is none', async () => {
    const { remove_watermark_top: { input, output } } = FILE_CONTENTS;
    const { value: formattedMarkdown } = await formatFromString(input);

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should add watermark in ToC', async () => {
    const { watermark_toc: { input, output } } = FILE_CONTENTS;
    const { value: formattedMarkdown } = await formatFromString(input, { watermark: 'toc' });

    expect(formattedMarkdown).toEqual(output);
  });

  test('It should preserve front matter content', async () => {
    const { front_matter: { input, output } } = FILE_CONTENTS;
    const { value: formattedMarkdown } = await formatFromString(input, {});

    expect(formattedMarkdown).toEqual(output);
  });
});
