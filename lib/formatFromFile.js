const readFile = require('./readFile');
const formatFromString = require('./formatFromString');

module.exports = async (sourceFilePath, parameterMarkdownFormatterOptions = {}, parameterStringifyOptions = {}) => {
  const sourceString = await readFile(sourceFilePath);
  return formatFromString(sourceString, parameterMarkdownFormatterOptions, parameterStringifyOptions);
};
