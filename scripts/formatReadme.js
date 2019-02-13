#!/usr/bin/env node

const { resolve: resolvePath } = require('path');

const writeFile = require('../lib/writeFile');
const formatFromFile = require('../lib/formatFromFile');

const README_PATH = resolvePath(__dirname, '..', 'README.md');

const main = async () => {
  const { contents } = await formatFromFile(README_PATH);
  await writeFile(README_PATH, contents);
};

main();
