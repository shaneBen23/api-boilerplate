const helper = require('./helper');
const logger = helper.getLogger('databaseUtils');
const mongoose = require('mongoose');
const config = require('../config');

/**
 * Method to initialize db connection
 */
function initMongo() {
  if (!(mongoose.connection.readyState === 1)) {
    logger.info('Connecting offchain db connection', config.db.MONGO_URL_SERVICE);

    return mongoose.connect(config.db.MONGO_URL_SERVICE, config.db.MONGO_CONFIG, function(err) {
      if (err) {
        logger.error('Could not connect offchain db', err);
      }
    });
  }
  return true;
}

/**
 * Method to verify db connection
 */
async function isConnected() {
  await initMongo();

  if (mongoose !== undefined && mongoose.connection !== undefined && mongoose.connection.readyState !== 1) {
    logger.info('Error while connecting to database');
    throw Error('Error while connecting to database');
  }
}

/**
 * Method to close db connection
 */
async function closeConnection() {
  mongoose.connection.close();
}

module.exports = {
  isConnected,
  closeConnection
};
