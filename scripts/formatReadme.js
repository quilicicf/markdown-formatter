#!/usr/bin/env node

import { resolve as resolvePath } from 'path';

import writeFile from '../lib/writeFile.js';
import formatFromFile from '../lib/formatFromFile.js';
import getAppRootPath from '../lib/getAppRootPath.js';

const main = async () => {
  const appRootPath = getAppRootPath();
  const readmePath = resolvePath(appRootPath, 'README.md');

  const { contents } = await formatFromFile(readmePath);
  await writeFile(readmePath, contents);
};

main()
  .catch((error) => process.stderr.write(`Error while generating the README:\n${error.stack}\n`));
