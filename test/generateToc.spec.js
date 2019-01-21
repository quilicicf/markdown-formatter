const { resolve: resolvePath } = require('path');

const readFile = require('../lib/readFile');
const generateToc = require('../lib/autoToc');

const INPUT_DATA_FILE = resolvePath(__dirname, 'test_input.md');
const OUTPUT_DATA_FILE = resolvePath(__dirname, 'test_output.md');

describe('Generate ToC', () => {
  test('It should generate a ToC', async () => {
    const inputMarkdownString = await readFile(INPUT_DATA_FILE);
    const outputMarkdownString = await readFile(OUTPUT_DATA_FILE);

    const markdownWithToc = await generateToc(inputMarkdownString);

    expect(markdownWithToc).toBe(outputMarkdownString);
  });
});
