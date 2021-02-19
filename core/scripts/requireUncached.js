'use strict';

module.exports = (NodeRequire) => {
  delete require.cache[require.resolve(NodeRequire)];
  return require(NodeRequire);
};
