const _ = require('lodash');

const loadDataSets = require('./loadDataSets');
const { formatFromFile, formatFromString } = require('../index');

const FILE_CONTENTS = {
  SIMPLE: {
    INPUT_PATH: '',
    OUTPUT_PATH: '',
    INPUT: '',
    OUTPUT: '',
  },
  DEFAULT_TOC_CONF: {
    INPUT_PATH: '',
    OUTPUT_PATH: '',
    INPUT: '',
    OUTPUT: '',
  },
};

describe('Format & generate ToC', () => {

  beforeAll(() => _.assign(FILE_CONTENTS, loadDataSets(FILE_CONTENTS)));

  test('It should format from string', async () => {
    const markdownWithToc = (await formatFromString(FILE_CONTENTS.SIMPLE.INPUT)).contents;

    expect(markdownWithToc).toEqual(FILE_CONTENTS.SIMPLE.OUTPUT);
  });

  test('It should format from file', async () => {
    const markdownWithToc = (await formatFromFile(FILE_CONTENTS.SIMPLE.INPUT_PATH)).contents;

    expect(markdownWithToc).toEqual(FILE_CONTENTS.SIMPLE.OUTPUT);
  });

  test('It should be idempotent', async () => {

    const markdownFormattedOnce = (await formatFromString(FILE_CONTENTS.SIMPLE.INPUT)).contents;
    const markdownFormattedTwice = (await formatFromString(markdownFormattedOnce)).contents;

    expect(markdownFormattedTwice).toEqual(markdownFormattedOnce);
  });

  test('It should use default ToC configuration when undefined', async () => {

    const formattedMarkdown = (await formatFromString(FILE_CONTENTS.DEFAULT_TOC_CONF.INPUT)).contents;

    expect(formattedMarkdown).toEqual(FILE_CONTENTS.DEFAULT_TOC_CONF.OUTPUT);
  });
});
