const _ = require('lodash');

const { NAME_SPACE, CONTAINS_CURSOR } = require('../../constants');

module.exports = tocContent => (
  _.some(tocContent, node => _.get(node, [ NAME_SPACE, CONTAINS_CURSOR ]))
);
