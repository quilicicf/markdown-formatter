import { resolve } from 'path';
import { readFileSync } from 'fs';

import getAppRootPath from './getAppRootPath.js';

export default () => {
  const appRootPath = getAppRootPath();
  const packagePath = resolve(appRootPath, 'package.json');
  const packageFileAsString = readFileSync(packagePath, 'utf8');
  return JSON.parse(packageFileAsString);
};
