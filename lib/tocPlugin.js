const _ = require('lodash');

const matchAll = require('./matchAll');

const tocStartMatcher = () => /^<!-- TOC START (.*) -->$/;

const CONFIG_CLEANERS = {
  min (minAsString) {
    try {
      return parseInt(minAsString, 0);
    } catch (error) {
      throw Error(`Min must be a number, got ${minAsString}`);
    }
  },
  max (maxAsString) {
    try {
      return parseInt(maxAsString, 0);
    } catch (error) {
      throw Error(`Min must be a number, got ${maxAsString}`);
    }
  },
};

const parseTocConfiguration = (tocStart) => {
  const configAsString = tocStartMatcher().exec(tocStart)[ 1 ];
  const configItems = matchAll(
    /([^\s:]+):([^\s]+)/g,
    configAsString,
    match => ({ key: match[ 1 ], value: match[ 2 ] }),
  );
  return _(configItems)
    .map((configItem) => {
      if (!CONFIG_CLEANERS[ configItem.key ]) {
        return configItem;
      }

      try {
        return {
          key: configItem.key,
          value: CONFIG_CLEANERS[ configItem.key ](configItem.value),
        };
      } catch (error) {
        process.stderr.write(error.message);
        return {};
      }
    })
    .filter(configItem => !_.isEmpty(configItem))
    .reduce(
      (seed, { value, key }) => ({ ...seed, [ key ]: value }),
      {},
    );
};

const transformer = (tree, file) => {
  const tocStart = _.find(tree.children, part => part.type === 'html' && tocStartMatcher().test(part.value));

  if (!tocStart) {
    process.stdout.write('No ToC start found, markdown was left unchanged.\n');
    return file;
  }

  const tocConfiguration = parseTocConfiguration(tocStart.value);
  console.log(tree);
  return file;
};

module.exports = () => transformer;
