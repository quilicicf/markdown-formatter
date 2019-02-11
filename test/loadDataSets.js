const _ = require('lodash');
const { existsSync, readFileSync } = require('fs');
const { resolve: resolvePath } = require('path');

/**
 * Retrieves the file contents from the data sets in ./data.
 * Only the data sets in dataSetsToLoad are retrieved.
 *
 * USAGE: loadDataSets({ DATA_SET_NAME: { INPUT: '', OUTPUT: '' } })
 *
 * Returns the contents of the data set './data/data_set_name' in INPUT and OUTPUT.
 */
module.exports = dataSetsToLoad => _.reduce(
  dataSetsToLoad,
  (seed, value, key) => {
    const folderName = key.toLowerCase();
    const folderPath = resolvePath(__dirname, 'data', folderName);

    if (!existsSync(folderPath)) { throw Error(`No data set found for ${key}`); }

    const inputPath = resolvePath(folderPath, 'input.md');
    if (!existsSync(inputPath)) { throw Error(`Data set input not found at ${inputPath}`); }

    const outputPath = resolvePath(folderPath, 'output.md');
    if (!existsSync(outputPath)) { throw Error(`Data set output not found at ${outputPath}`); }

    return {
      ...seed,
      [ key ]: {
        INPUT_PATH: inputPath,
        INPUT: readFileSync(inputPath, 'utf8'),
        OUTPUT_PATH: outputPath,
        OUTPUT: readFileSync(outputPath, 'utf8'),
      },
    };
  },
  {},
);
