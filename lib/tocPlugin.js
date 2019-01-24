const _ = require('lodash');
const buildNode = require('unist-builder');
const makeToc = require('mdast-util-toc');

const matchAll = require('./matchAll');
const isInRange = require('./isInRange');

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
  const tocStartFinder = _.reduce(
    tree.children,
    (seed, part) => {
      if (seed.tocStart) {
        return seed;
      }

      if (part.type === 'html' && tocStartMatcher().test(part.value)) {
        return {
          tocStart: part,
          index: seed.index,
        };
      }

      return {
        tocStart: undefined,
        index: seed.index + 1,
      };
    },
    { index: 0, tocStart: undefined },
  );

  if (!tocStartFinder.tocStart) {
    process.stdout.write('No ToC start found, markdown was left unchanged.\n');
    return file;
  }

  const tocConfiguration = parseTocConfiguration(tocStartFinder.tocStart.value);
  const filteredHeadings = _(tree.children)
    .filter(part => part.type === 'heading' && isInRange(part.depth, tocConfiguration))
    .value();
  const toc = makeToc(buildNode('root', filteredHeadings));
  tree.children.splice(tocStartFinder.index + 1, 0, toc.map);
  console.log();
};

module.exports = () => transformer;
