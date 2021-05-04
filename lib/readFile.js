import { readFile } from 'fs';

export default async (path, transformer = (i) => i) => new Promise((resolve, reject) => {
  readFile(path, 'utf8', (error, data) => {
    if (error) { return reject(error); }
    return resolve(transformer(data));
  });
});
