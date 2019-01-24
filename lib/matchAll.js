const _ = require('lodash');

/**
 * Takes a GLOBAL (add flag g) regex and executes it against the same string as long as it yields results.
 * The exec results are handled by the given matchHandler and returned in an array.
 */
const matchAll = (regex, string, matchHandler = _.identity, currentMatches = []) => {
  const nextMatch = regex.exec(string);

  if (!nextMatch) { return currentMatches; }

  return [
    ...matchAll(regex, string, matchHandler, [ ...currentMatches, matchHandler(nextMatch) ]),
  ];
};

module.exports = matchAll;
