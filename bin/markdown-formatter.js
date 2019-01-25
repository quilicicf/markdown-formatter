#!/usr/bin/env node

/* eslint-disable spaced-comment */

/*************************
 *     REQUIRE LIBS      *
 ************************/

const yargs = require('yargs');

/*********************
 *  REQUIRE MODULES  *
 ********************/

const isValidPath = require('is-valid-path');

const formatFromString = require('../lib/formatFromString');
const writeFile = require('../lib/writeFile');

/*************************
 *   PROCESS ARGUMENTS   *
 ************************/

const main = async (args) => {
  const { content, 'output-file': outputFile } = args;
  const result = await formatFromString(content);

  return outputFile
    ? writeFile(outputFile, result)
    : Promise.resolve(process.stdout.write(`${result}\n`));
};

const parseArgs = () => yargs
  .usage('usage: markdown-format <options>')
  .option('content', {
    alias: 'c',
    describe: 'Markdown string to format',
    type: 'string',
  })
  .option('output-file', {
    alias: 'o',
    describe: 'File where the result should be written',
    type: 'string',
    coerce (outputFile) {
      if (!isValidPath(outputFile)) { throw Error(`File ${outputFile} is not a valid file path`); }
      return outputFile;
    },
  })
  .help()
  .version()
  .wrap(null)
  .epilogue('For more information, read the manual at https://github.com/quilicicf/markdown-formatter')
  .argv;

try {
  main(parseArgs());
} catch (error) {
  throw error;
}
