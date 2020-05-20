const _ = require('lodash');

const { WATERMARK_TOP } = require('../../constants');

const isWatermarkTop = part => part.type === 'html' && part.value === WATERMARK_TOP;

module.exports = (tree) => {
  const watermarkIndex = _.chain(tree.children) // Watermark can be moved by user
    .map((part, index) => ({ part, index }))
    .filter(({ part }) => isWatermarkTop(part))
    .map(({ index }) => index)
    .first()
    .value();

  if (_.isNumber(watermarkIndex)) { tree.children.splice(watermarkIndex, 1); }
};
