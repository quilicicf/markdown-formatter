const readFile = require('./readFile');
const formatFromString = require('./formatFromString');

module.exports = async (sourceMarkdownFilePath, cursorOffset = undefined) => {
  const sourceMarkdownString = await readFile(sourceMarkdownFilePath, cursorOffset);
  return formatFromString(sourceMarkdownString);
};
