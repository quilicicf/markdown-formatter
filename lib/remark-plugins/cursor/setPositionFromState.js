/**
 * Must mutate input to make cursor information go up the chain.
 */
module.exports = (options, state) => {
  // eslint-disable-next-line no-param-reassign
  options.newCursorPosition = {
    line: state.newCursorLine,
    column: state.newCursorColumn,
  };
};
