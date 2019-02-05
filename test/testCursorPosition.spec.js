const _ = require('lodash');
const { resolve: resolvePath } = require('path');

const readFile = require('../lib/readFile');
const formatFromString = require('../lib/formatFromString');

const INPUT_FILE_PATH = resolvePath(__dirname, 'test_input.md');
const OUTPUT_FILE_PATH = resolvePath(__dirname, 'test_output.md');

const TESTS_DATA_SETS = [
  [ 'at document start', 'document start', 0, 0 ],
  [ 'inside the ToC marker', 'same place in ToC marker', 54, 54 ],
  [ 'inside the ToC', 'end of the ToC', 80, 243 ],
  [ 'inside a paragraph', 'same place in paragraph', 170, 315 ],
  [ 'at the end of a paragraph', 'end of paragraph', 174, 319 ],
  [ 'between paragraphs', 'between the same paragraphs', 14, 14 ],
];

const FILE_CONTENTS = {
  INPUTS: {
    SIMPLE_TESTS: '',
    TRICKY_TESTS: '',
  },
  OUTPUTS: {
    SIMPLE_TESTS: '',
    TRICKY_TESTS: '',
  },
};

describe('Re-locate cursor position', () => {

  beforeAll(async () => {
    _.assign(FILE_CONTENTS, {
      INPUTS: {
        SIMPLE_TESTS: await readFile(INPUT_FILE_PATH),
        TRICKY_TESTS: '',
      },
      OUTPUTS: {
        SIMPLE_TESTS: await readFile(OUTPUT_FILE_PATH),
        TRICKY_TESTS: '',
      },
    });
  });

  test.each(TESTS_DATA_SETS)(
    'It should relocate the cursor position from %s to %s',
    async (inputLabel, outputLabel, inputOffset, outputOffset) => {
      const {
        contents: fileContent,
        newCursorPosition,
      } = await formatFromString(FILE_CONTENTS.INPUTS.SIMPLE_TESTS, inputOffset);

      expect(fileContent.substring(0, newCursorPosition.offset))
        .toBe(FILE_CONTENTS.OUTPUTS.SIMPLE_TESTS.substring(0, outputOffset));

      expect(newCursorPosition.offset).toBe(outputOffset);
    },
  );
});
