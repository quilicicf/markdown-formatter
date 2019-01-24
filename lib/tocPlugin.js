const _ = require('lodash');
const buildNode = require('unist-builder');
const makeToc = require('mdast-util-toc');

const matchAll = require('./matchAll');
const isInRange = require('./isInRange');

const tocStartMatcher = () => /^<!-- TOC START (.*) -->$/;
const tocEndMatcher = () => /^<!-- TOC END -->$/;

const DEFAULT_CONFIGURATION = { min: 2, max: 4 };

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

const transformer = (tree) => {
  const tocStartFinder = _.reduce(
    tree.children,
    (seed, part) => {
      if (seed.tocStart && !seed.isInToc) {
        return seed;
      }

      if (part.type === 'html' && tocStartMatcher().test(part.value)) {
        return {
          ...seed,
          tocStart: part,
          tocStartIndex: seed.tocStartIndex,
          isInToc: true,
        };
      }

      if (part.type === 'html' && tocEndMatcher().test(part.value)) {
        return { ...seed, isInToc: false };
      }

      return seed.isInToc
        ? {
          ...seed,
          tocSize: seed.tocSize + 1,
        }
        : {
          ...seed,
          tocStartIndex: seed.tocStartIndex + 1,
        };
    },
    {
      tocStartIndex: 0,
      tocSize: 0,
      tocStart: undefined,
      isInToc: false,
    },
  );

  if (!tocStartFinder.tocStart) {
    process.stdout.write('No ToC start found, markdown was left unchanged.\n');
    return;
  }

  const tocConfiguration = {
    ...DEFAULT_CONFIGURATION,
    ...parseTocConfiguration(tocStartFinder.tocStart.value),
  };
  const filteredHeadings = _(tree.children)
    .filter(part => part.type === 'heading' && isInRange(part.depth, tocConfiguration))
    .value();
  const toc = makeToc(buildNode('root', filteredHeadings));
  tree.children.splice(tocStartFinder.tocStartIndex + 1, tocStartFinder.tocSize, toc.map);
};

module.exports = () => transformer;
