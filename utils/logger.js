
const log4js = require('log4js');

function getLogger(moduleName) {
  const logger = log4js.getLogger(moduleName);
  logger.level = 'debug';
  return logger;
};

module.exports = getLogger;
