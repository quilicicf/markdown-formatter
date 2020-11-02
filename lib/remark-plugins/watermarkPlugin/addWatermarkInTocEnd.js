const _ = require('lodash');

const isTocEnd = require('../isTocEnd');
const { WATERMARK_TOC } = require('../../constants');

module.exports = (tree) => {
  const tocEnd = _.find(tree.children, (part) => isTocEnd(part));
  if (tocEnd) { _.set(tocEnd, [ 'value' ], WATERMARK_TOC); }
};
