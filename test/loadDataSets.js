import { resolve as resolvePath } from 'path';
import { existsSync, readdirSync, readFileSync } from 'fs';

import getAppRootPath from '../lib/getAppRootPath';

/**
 * Retrieves the file contents from the data sets in ./data.
 * Returns and object indexing the data sets input/ouput/inputPath/outputPath by data set name.
 */
export default () => {
  const appRootPath = getAppRootPath();
  const dataSetsFolderPath = resolvePath(appRootPath, 'test', 'data');

  const dataSetNames = readdirSync(dataSetsFolderPath);
  return dataSetNames.reduce(
    (seed, dataSetName) => {
      const folderPath = resolvePath(dataSetsFolderPath, dataSetName);

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
