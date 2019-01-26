const readFile = require('./readFile');
const formatFromString = require('./formatFromString');

module.exports = async (sourceMarkdownFilePath) => {
  const sourceMarkdownString = await readFile(sourceMarkdownFilePath);
  return formatFromString(sourceMarkdownString);
};
