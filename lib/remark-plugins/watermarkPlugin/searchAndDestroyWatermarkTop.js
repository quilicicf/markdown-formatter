const _ = require('lodash');

const { WATERMARK_TOP } = require('../../constants');

const isWatermarkTop = part => part.type === 'html' && part.value === WATERMARK_TOP;

module.exports = (tree) => {
  const watermarkIndex = _.chain(tree.children)
    .map((part, index) => ({ part, index }))
    .find(part => isWatermarkTop(part))
    .map(({ index }) => index)
    .value();

  if (_.isNumber(watermarkIndex)) { tree.splice(watermarkIndex, 1); }
};
