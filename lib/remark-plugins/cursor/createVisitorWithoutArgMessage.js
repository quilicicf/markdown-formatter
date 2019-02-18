module.exports = visitorName => (
  `Found a level 1 markdown node whose visitor of type ${visitorName} has no argument.
This can mess with the cursor position in the formatted file.`
);
