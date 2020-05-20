const _ = require('lodash');
const { resolve: resolvePath } = require('path');
const { existsSync, readFileSync, readdirSync } = require('fs');

/**
 * Retrieves the file contents from the data sets in ./data.
 * Returns and object indexing the data sets input/ouput/inputPath/outputPath by data set name.
 */
module.exports = () => {
  const dataSetsFolder = resolvePath(__dirname, 'data');
  const dataSetNames = readdirSync(dataSetsFolder);
  return _.reduce(
    dataSetNames,
    (seed, dataSetName) => {
      const folderPath = resolvePath(__dirname, 'data', dataSetName);

      const inputPath = resolvePath(folderPath, 'input.md');
      if (!existsSync(inputPath)) { throw Error(`Data set input not found at ${inputPath}`); }

      const outputPath = resolvePath(folderPath, 'output.md');
      if (!existsSync(outputPath)) { throw Error(`Data set output not found at ${outputPath}`); }

      return {
        ...seed,
        [ dataSetName ]: {
          inputPath,
          input: readFileSync(inputPath, 'utf8'),
          outputPath,
          output: readFileSync(outputPath, 'utf8'),
        },
      };
    },
    {},
  );
};
