const { resolve: resolvePath } = require('path');

const readFile = require('../lib/readFile');
const { formatFromFile, formatFromString } = require('../index');

const INPUT_DATA_FILE = resolvePath(__dirname, 'test_input.md');
const OUTPUT_DATA_FILE = resolvePath(__dirname, 'test_output.md');

describe('Format', () => {
  test('It should format from string', async () => {
    const inputMarkdownString = await readFile(INPUT_DATA_FILE);
    const outputMarkdownString = await readFile(OUTPUT_DATA_FILE);

    const markdownWithToc = await formatFromString(inputMarkdownString);

    expect(markdownWithToc).toBe(outputMarkdownString);
  });

  test('It should format from file', async () => {
    const outputMarkdownString = await readFile(OUTPUT_DATA_FILE);

    const markdownWithToc = await formatFromFile(INPUT_DATA_FILE);

    expect(markdownWithToc).toBe(outputMarkdownString);
  });

  test('It should be idempotent', async () => {
    const inputMarkdownString = await readFile(INPUT_DATA_FILE);

    const markdownFormattedOnce = await formatFromString(inputMarkdownString);
    const markdownFormattedTwice = await formatFromString(markdownFormattedOnce);

    expect(markdownFormattedTwice).toBe(markdownFormattedOnce);
  });
});
