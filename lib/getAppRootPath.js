import { resolve } from 'path';

export default () => {
  const filePath = import.meta.url.replace(/^file:/, '');
  return resolve(filePath, '..', '..');
};
