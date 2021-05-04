import readFile from './readFile.js';
import formatFromString from './formatFromString.js';

export default async (sourceFilePath, parameterMarkdownFormatterOptions = {}, parameterStringifyOptions = {}) => {
  const sourceString = await readFile(sourceFilePath);
  return formatFromString(sourceString, parameterMarkdownFormatterOptions, parameterStringifyOptions);
};
