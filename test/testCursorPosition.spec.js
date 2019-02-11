const _ = require('lodash');

const loadDataSets = require('./loadDataSets');
const formatFromString = require('../lib/formatFromString');

const TESTS_DATA_SETS = [
  [ 'at document start', 'document start', 0, 0 ],
  [ 'inside the ToC marker', 'same place in ToC marker', 54, 54 ],
  [ 'inside the ToC', 'end of the ToC', 80, 243 ],
  [ 'inside a paragraph', 'same place in paragraph', 170, 315 ],
  [ 'at the end of a paragraph', 'end of paragraph', 174, 319 ],
  [ 'between paragraphs', 'between the same paragraphs', 14, 14 ],
];

const FILE_CONTENTS = {
  SIMPLE: {
    INPUT_PATH: '',
    OUTPUT_PATH: '',
    INPUT: '',
    OUTPUT: '',
  },
};

describe('Re-locate cursor position', () => {

  beforeAll(() => _.assign(FILE_CONTENTS, loadDataSets(FILE_CONTENTS)));

  test.each(TESTS_DATA_SETS)(
    'It should relocate the cursor position from %s to %s',
    async (inputLabel, outputLabel, inputOffset, outputOffset) => {
      const {
        contents: fileContent,
        newCursorPosition,
      } = await formatFromString(FILE_CONTENTS.SIMPLE.INPUT, inputOffset);

      expect(fileContent.substring(0, newCursorPosition.offset))
        .toBe(FILE_CONTENTS.SIMPLE.OUTPUT.substring(0, outputOffset));

      expect(newCursorPosition.offset).toBe(outputOffset);
    },
  );
});
