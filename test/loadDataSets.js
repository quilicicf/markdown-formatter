import { resolve as resolvePath } from 'path';
import { existsSync, readdirSync, readFileSync } from 'fs';

/**
 * Retrieves the file contents from the data sets in ./data.
 * Returns and object indexing the data sets input/ouput/inputPath/outputPath by data set name.
 */
export default () => {
  const fileUrl = import.meta.url.replace(/^file:/, '');
  const dataSetsFolder = resolvePath(fileUrl, '..', 'data');

  const dataSetNames = readdirSync(dataSetsFolder);
  return dataSetNames.reduce(
    (seed, dataSetName) => {
      const folderPath = resolvePath(fileUrl, '..', 'data', dataSetName);

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
