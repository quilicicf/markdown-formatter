const _ = require('lodash');

/* eslint-disable no-param-reassign */
module.exports = (STATE, {
  newCursorLine = undefined,
  newCursorColumn = undefined,
  hasFoundNewCursorPosition = undefined,
}) => {

  if (!_.isUndefined(newCursorLine)) { STATE.newCursorLine = newCursorLine; }
  if (!_.isUndefined(newCursorColumn)) { STATE.newCursorColumn = newCursorColumn; }
  if (!_.isUndefined(hasFoundNewCursorPosition)) { STATE.hasFoundNewCursorPosition = hasFoundNewCursorPosition; }
};
