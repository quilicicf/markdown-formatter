import { writeFile } from 'fs';

export default async (path, data) => new Promise((resolve, reject) => {
  writeFile(path, data, 'utf8', (error) => {
    if (error) { return reject(error); }
    return resolve();
  });
});
