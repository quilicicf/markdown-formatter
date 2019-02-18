const _ = require('lodash');

const { NAME_SPACE, DEPTH } = require('../../constants');

const recursiveSetDepth = (nodes, depth = 2) => {
  if (nodes && !_.isEmpty(nodes)) {
    _.each(nodes, (node) => {
      _.set(node, [ NAME_SPACE, DEPTH ], depth);
      recursiveSetDepth(node.children, depth + 1);
    });
  }
};

module.exports = recursiveSetDepth;
