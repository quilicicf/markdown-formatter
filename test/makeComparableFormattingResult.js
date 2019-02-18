module.exports = (newCursorOffset, newCursorPosition, fileContent) => `---
Offset: ${newCursorOffset}
Position:
  line: ${newCursorPosition.line}
  column: ${newCursorPosition.column}
Content: 
${fileContent.substring(0, newCursorOffset)}
`;
