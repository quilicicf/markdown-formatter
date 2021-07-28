#!/usr/bin/env node

/* eslint-disable spaced-comment */

/*************************
 *     REQUIRE LIBS      *
 ************************/
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/*********************
 *  REQUIRE MODULES  *
 ********************/
import { existsSync } from 'fs';
import isValidPath from 'is-valid-path';

import readFile from '../lib/readFile.js';
import writeFile from '../lib/writeFile.js';
import formatFromFile from '../lib/formatFromFile.js';
import formatFromString from '../lib/formatFromString.js';
import getPackageFileSync from '../lib/getPackageFileSync.js';

const {
  homepage,
  bugs: { url: issueTrackerUrl },
} = getPackageFileSync();

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

  const { value } = inputFilePath
    ? await formatFromFile(inputFilePath, markdownFormatterOptions, stringifyOptions)
    : await formatFromString(content, markdownFormatterOptions, stringifyOptions);

  const fileDestination = shouldReplaceFile ? inputFilePath : outputFilePath;
  return fileDestination
    ? writeFile(fileDestination, value)
    : process.stdout.write(`${value}\n`);
};

const parseArgs = () => yargs(hideBin(process.argv))
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
      if (inputFile && !existsSync(inputFile)) {
        throw Error(`Input file "${inputFile}" does not exist`);
      }
      return inputFile;
    },
  })
  .option(ARG_OUTPUT_FILE, {
    alias: 'o',
    describe: 'File where the result should be written',
    type: 'string',

    coerce (outputFile) {
      if (outputFile && !isValidPath(outputFile)) {
        throw Error(`Output file "${outputFile}" is not a valid file path`);
      }
      return outputFile;
    },
  })
  .option(ARG_USE_CONFIGURATION, {
    alias: 'u',
    describe: 'File containing the configuration',
    type: 'string',

    coerce (configurationFile) {
      if (configurationFile && !existsSync(configurationFile)) {
        throw Error(`Configuration file ${configurationFile} does not exist`);
      }
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
  .epilogue(`For more information, read the manual: ${homepage}`)
  .argv;

main(parseArgs())
  .catch(() => {
    /* Can't happen, yargs catches the errors first */
    process.stderr.write(`This error should not happen, please contact the developer: ${issueTrackerUrl}\n`);
  });
