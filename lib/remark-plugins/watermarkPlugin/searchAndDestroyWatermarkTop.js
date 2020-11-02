const _ = require('lodash');

const { WATERMARK_TOP } = require('../../constants');

const isWatermarkTop = (part) => part.type === 'html' && part.value === WATERMARK_TOP;

module.exports = (tree, file) => {
  const watermarkIndex = _.chain(tree.children) // Watermark can be moved by user
    .map((part, index) => ({ part, index }))
    .filter(({ part }) => isWatermarkTop(part))
    .map(({ index }) => index)
    .first()
    .value();

  if (_.isNumber(watermarkIndex)) {
    file.info(`Watermark found at index ${watermarkIndex}, destroying it to replace it`);
    tree.children.splice(watermarkIndex, 1);
  }
};
