const _ = require('lodash');

const { readFile } = require('fs');

module.exports = async (path, transformer = _.identity) => new Promise((resolve, reject) => {
  readFile(path, 'utf8', (error, data) => {
    if (error) { return reject(error); }
    return resolve(transformer(data));
  });
});
