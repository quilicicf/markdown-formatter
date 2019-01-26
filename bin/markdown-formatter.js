#!/usr/bin/env node

/* eslint-disable spaced-comment */

/*************************
 *     REQUIRE LIBS      *
 ************************/

const yargs = require('yargs');

/*********************
 *  REQUIRE MODULES  *
 ********************/

const { existsSync } = require('fs');
const isValidPath = require('is-valid-path');

const writeFile = require('../lib/writeFile');
const formatFromFile = require('../lib/formatFromFile');
const formatFromString = require('../lib/formatFromString');

/*************************
 *   PROCESS ARGUMENTS   *
 ************************/

const main = async (args) => {
  const {
    content,
    file: inputFile,
    'output-file': outputFile,
    replace: shouldReplaceFile,
  } = args;

  const result = inputFile
    ? await formatFromFile(inputFile)
    : await formatFromString(content);

  const fileDestination = shouldReplaceFile ? inputFile : outputFile;
  return fileDestination
    ? writeFile(fileDestination, result)
    : Promise.resolve(process.stdout.write(`${result}\n`));
};

const parseArgs = () => yargs
  .usage('usage: markdown-format <options>')
  .option('content', {
    alias: 'c',
    describe: 'Markdown string to format',
    type: 'string',
    conflicts: 'file',
  })
  .option('replace', {
    alias: 'r',
    describe: 'Replaces the file content',
    type: 'boolean',
    conflicts: [ 'content', 'output-file' ],
  })
  .option('file', {
    alias: 'f',
    describe: 'Markdown file to format',
    type: 'string',
    conflicts: 'content',
    coerce (inputFile) {
      if (!existsSync(inputFile)) { throw Error(`File ${inputFile} does not exist`); }
      return inputFile;
    },
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
