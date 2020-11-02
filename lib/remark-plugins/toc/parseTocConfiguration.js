const _ = require('lodash');

const matchAll = require('../../matchAll');
const { TOC_START_MATCHER } = require('../../constants');

const CONFIG_CLEANERS = {
  min (minAsString) {
    try {
      return parseInt(minAsString, 10);
    } catch (error) {
      throw Error(`Min must be a number, got ${minAsString}`);
    }
  },
  max (maxAsString) {
    try {
      return parseInt(maxAsString, 10);
    } catch (error) {
      throw Error(`Min must be a number, got ${maxAsString}`);
    }
  },
};

module.exports = (tocStart) => {
  const configAsString = TOC_START_MATCHER.exec(tocStart)[ 1 ];
  const configItems = matchAll(
    /([^\s:]+):([^\s]+)/g,
    configAsString,
    (match) => ({ key: match[ 1 ], value: match[ 2 ] }),
  );
  return _(configItems)
    .map((configItem) => {
      if (!CONFIG_CLEANERS[ configItem.key ]) {
        return configItem;
      }

      try {
        return {
          key: configItem.key,
          value: CONFIG_CLEANERS[ configItem.key ](configItem.value),
        };
      } catch (error) {
        process.stderr.write(error.message);
        return {};
      }
    })
    .filter((configItem) => !_.isEmpty(configItem))
    .reduce(
      (seed, { value, key }) => ({ ...seed, [ key ]: value }),
      {},
    );
};
