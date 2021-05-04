/**
 * Takes a GLOBAL (add flag g) regex and executes it against the same string as long as it yields results.
 * The exec results are handled by the given matchHandler and returned in an array.
 */
const matchAll = (regex, string, matchHandler = (i) => i, currentMatches = []) => {
  const nextMatch = regex.exec(string);

  if (!nextMatch) { return currentMatches; }

  return [
    ...matchAll(regex, string, matchHandler, [ ...currentMatches, matchHandler(nextMatch) ]),
  ];
};

export default matchAll;
