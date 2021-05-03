import { WATERMARK_TOP } from '../../constants';

const isWatermarkTop = (part) => part.type === 'html' && part.value === WATERMARK_TOP;

export default (tree, file) => {
  const watermarkIndex = tree.children // Watermark can be moved by user
    .map((part, index) => ({ part, index }))
    .filter(({ part }) => isWatermarkTop(part))
    .map(({ index }) => index)
    .find(() => true);

  if (typeof watermarkIndex === 'number') {
    file.info(`Watermark found at index ${watermarkIndex}, destroying it to replace it`);
    tree.children.splice(watermarkIndex, 1);
  }
};
