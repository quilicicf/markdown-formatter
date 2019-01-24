#!/usr/bin/env node

const { resolve: resolvePath } = require('path');

const readFile = require('../lib/readFile');
const writeFile = require('../lib/writeFile');
const formatFromString = require('../lib/formatFromString');

const README_PTAH = resolvePath(__dirname, '..', 'README.md');

const main = async () => {
  const readmeAsString = await readFile(README_PTAH);
  const formattedReadme = await formatFromString(readmeAsString);
  await writeFile(README_PTAH, formattedReadme);
};

main();
