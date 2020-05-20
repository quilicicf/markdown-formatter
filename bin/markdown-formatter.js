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

const readFile = require('../lib/readFile');
const writeFile = require('../lib/writeFile');
const formatFromFile = require('../lib/formatFromFile');
const formatFromString = require('../lib/formatFromString');

/*************************
 *   PROCESS ARGUMENTS   *
 ************************/

const ARG_CONTENT = 'content';
const ARG_INPUT_FILE = 'file';
const ARG_OUTPUT_FILE = 'output-file';
const ARG_REPLACE = 'replace';
const ARG_USE_CONFIGURATION = 'use-configuration';

const loadConfiguration = async (filePath) => {
  try {
    return readFile(filePath, JSON.parse);
  } catch (error) {
    throw Error(`The content of the configuration file ${filePath} is not valid JSON`);
  }
};

const main = async (args) => {
  const {
    [ ARG_CONTENT ]: content,
    [ ARG_INPUT_FILE ]: inputFilePath,
    [ ARG_OUTPUT_FILE ]: outputFilePath,
    [ ARG_REPLACE ]: shouldReplaceFile,
    [ ARG_USE_CONFIGURATION ]: configurationFilePath,
  } = args;

  const configurationOverwrites = configurationFilePath ? await loadConfiguration(configurationFilePath) : {};
  const {
    markdownFormatterOptions = {},
    stringifyOptions = {},
  } = configurationOverwrites;

  const { contents } = inputFilePath
    ? await formatFromFile(inputFilePath, markdownFormatterOptions, stringifyOptions)
    : await formatFromString(content, markdownFormatterOptions, stringifyOptions);

  const fileDestination = shouldReplaceFile ? inputFilePath : outputFilePath;
  return fileDestination
    ? writeFile(fileDestination, contents)
    : process.stdout.write(`${contents}\n`);
};

const parseArgs = () => yargs
  .usage('usage: markdown-format <options>')
  .option(ARG_CONTENT, {
    alias: 'c',
    describe: 'Markdown string to format',
    type: 'string',
    conflicts: 'file',
  })
  .option(ARG_REPLACE, {
    alias: 'r',
    describe: 'Replaces the file content',
    type: 'boolean',
    conflicts: [ 'content', 'output-file' ],
  })
  .option(ARG_INPUT_FILE, {
    alias: 'f',
    describe: 'Markdown file to format',
    type: 'string',
    conflicts: 'content',
    coerce (inputFile) {
      if (!existsSync(inputFile)) { throw Error(`File ${inputFile} does not exist`); }
      return inputFile;
    },
  })
  .option(ARG_OUTPUT_FILE, {
    alias: 'o',
    describe: 'File where the result should be written',
    type: 'string',

    coerce (outputFile) {
      if (!isValidPath(outputFile)) { throw Error(`File ${outputFile} is not a valid file path`); }
      return outputFile;
    },
  })
  .option(ARG_USE_CONFIGURATION, {
    alias: 'u',
    describe: 'File containing the configuration',
    type: 'string',

    coerce (configurationFile) {
      if (!existsSync(configurationFile)) { throw Error(`File ${configurationFile} does not exist`); }
      return configurationFile;
    },
  })
  .check((currentArguments) => {
    if (!currentArguments.content && !currentArguments.file) {
      throw Error('You must specify one argument of [content, file]');
    }

    return true;
  })
  .help()
  .version()
  .wrap(null)
  .epilogue('For more information, read the manual at https://github.com/quilicicf/markdown-formatter')
  .argv;

main(parseArgs());
