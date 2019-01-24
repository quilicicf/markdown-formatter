const { resolve: resolvePath } = require('path');

const readFile = require('../lib/readFile');
const formatFromString = require('../lib/formatFromString');

const INPUT_DATA_FILE = resolvePath(__dirname, 'test_input.md');
const OUTPUT_DATA_FILE = resolvePath(__dirname, 'test_output.md');

describe('Generate ToC', () => {
  test('It should format', async () => {
    const inputMarkdownString = await readFile(INPUT_DATA_FILE);
    const outputMarkdownString = await readFile(OUTPUT_DATA_FILE);

    const markdownWithToc = await formatFromString(inputMarkdownString);

    expect(markdownWithToc).toBe(outputMarkdownString);
  });

  test('It should be idempotent', async () => {
    const inputMarkdownString = await readFile(INPUT_DATA_FILE);

    const markdownFormattedOnce = await formatFromString(inputMarkdownString);
    const markdownFormattedTwice = await formatFromString(markdownFormattedOnce);

    expect(markdownFormattedTwice).toBe(markdownFormattedOnce);
  });
});
