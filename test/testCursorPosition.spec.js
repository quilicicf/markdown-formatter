const _ = require('lodash');

const loadDataSets = require('./loadDataSets');
const makeComparableFormattingResult = require('./makeComparableFormattingResult');
const formatFromString = require('../lib/formatFromString');

const SIMPLE_DATA_SETS = [
  [ 'at document start', 'document start', 0, 0, { line: 0, column: 0 } ],
  [ 'inside the ToC marker', 'same place in ToC marker', 54, 54, { line: 5, column: 24 } ],
  [ 'inside the ToC', 'end of the ToC', 80, 243, { line: 12, column: 49 } ],
  [ 'inside a paragraph', 'same place in paragraph', 170, 315, { line: 18, column: 32 } ],
  [ 'at the end of a paragraph', 'end of paragraph', 174, 319, { line: 18, column: 36 } ],
  [ 'between paragraphs', 'between the same paragraphs', 14, 14, { line: 2, column: 0 } ],
  [ 'between far-away paragraphs', 'between the same paragraphs', 1537, 2035, { line: 63, column: 0 } ],
];

const TABLE_DATA_SETS = [
  [ 'in a table row that will be padded', 'in the same row, column is meh', 129, 176, { line: 7, column: 23 } ],
  [ 'at the end of a table row', 'in the same row, column is meh', 131, 178, { line: 7, column: 25 } ],
];

const FILE_CONTENTS = {
  SIMPLE: {
    INPUT: '',
    OUTPUT: '',
  },
  TABLE: {
    INPUT: '',
    OUTPUT: '',
  },
};

describe('Re-locate cursor position', () => {

  beforeAll(() => _.assign(FILE_CONTENTS, loadDataSets(FILE_CONTENTS)));

  test.each(SIMPLE_DATA_SETS)(
    'It should relocate the cursor position from %s to %s in the simple data set',
    async (inputLabel, outputLabel, inputOffset, outputOffset, outputPosition) => {
      const {
        contents: fileContent,
        newCursorOffset,
        newCursorPosition,
      } = await formatFromString(FILE_CONTENTS.SIMPLE.INPUT, inputOffset);

      const expected = makeComparableFormattingResult(outputOffset, outputPosition, FILE_CONTENTS.SIMPLE.OUTPUT);

      expect(makeComparableFormattingResult(newCursorOffset, newCursorPosition, fileContent)).toBe(expected);

      process.stdout.write(`${expected}\n`);
    },
  );

  test.each(TABLE_DATA_SETS)(
    'It should relocate the cursor position from %s to %s in the table data set',
    async (inputLabel, outputLabel, inputOffset, outputOffset, outputPosition) => {
      const {
        contents: fileContent,
        newCursorOffset,
        newCursorPosition,
      } = await formatFromString(FILE_CONTENTS.TABLE.INPUT, inputOffset);

      const expected = makeComparableFormattingResult(outputOffset, outputPosition, FILE_CONTENTS.TABLE.OUTPUT);

      expect(makeComparableFormattingResult(newCursorOffset, newCursorPosition, fileContent)).toBe(expected);

      process.stdout.write(`${expected}\n`);
    },
  );
});
