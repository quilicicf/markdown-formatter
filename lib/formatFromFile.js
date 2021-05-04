import readFile from './readFile';
import formatFromString from './formatFromString';

export default async (sourceFilePath, parameterMarkdownFormatterOptions = {}, parameterStringifyOptions = {}) => {
  const sourceString = await readFile(sourceFilePath);
  return formatFromString(sourceString, parameterMarkdownFormatterOptions, parameterStringifyOptions);
};
