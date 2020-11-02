const _ = require('lodash');
const buildNode = require('unist-builder');
const makeToc = require('mdast-util-toc');

const findTocStart = require('./findTocStart');
const parseTocConfiguration = require('./parseTocConfiguration');

const isInRange = require('../../isInRange');
const { DEFAULT_TOC_OPTIONS } = require('../../constants');

const transformer = (tree, file) => {
  const tocStartFinder = findTocStart(tree);

  if (!tocStartFinder.tocStart) {
    file.info('No ToC start found, only simple formatting was done');
    return;
  }

  const tocConfiguration = {
    ...DEFAULT_TOC_OPTIONS,
    ...parseTocConfiguration(tocStartFinder.tocStart.value),
  };

  const filteredHeadings = _.filter(
    tree.children,
    (part) => part.type === 'heading' && isInRange(part.depth, tocConfiguration),
  );

  const toc = makeToc(buildNode('root', filteredHeadings)).map;
  tree.children.splice(tocStartFinder.tocStartIndex + 1, tocStartFinder.tocSize, toc);
};

module.exports = () => transformer;
