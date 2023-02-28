#!/usr/bin/env node

import { resolve as resolvePath } from 'path';

import writeFile from '../lib/writeFile.js';
import formatFromFile from '../lib/formatFromFile.js';
import getAppRootPath from '../lib/getAppRootPath.js';

const main = async () => {
  const appRootPath = getAppRootPath();
  const readmePath = resolvePath(appRootPath, 'README.md');

  const markdownFormatterOptions = { watermark: 'top' };
  const { value } = await formatFromFile(readmePath, markdownFormatterOptions);
  await writeFile(readmePath, value);
};

main()
  .catch((error) => process.stderr.write(`Error while generating the README:\n${error.stack}\n`));
