const service = require('../service/userService');
const { invalidRequest, successfulRequest } = require('../helpers/responseHelper');
const getLogger = require('../utils/logger');
const logger = getLogger('userController');

async function registerUser(req, res) {
  logger.info('registerUser', 'inside method');
  const { username, email, password } = req.body;
  const data = { username, email, password };
  await service.registerUser(data).then((userDetails) => {
    logger.info('registerUser', 'data received');
    successfulRequest(res, userDetails);
  }).catch((error) => {
    logger.error('registerUser', 'exception occured', error);
    invalidRequest(res, error.message);
  });
}

async function authenticate(req, res) {
  logger.info('authenticate', 'inside method');
  const { username, email, password } = req.body;
  const data = { username, email, password };
  await service.authenticate(data).then((userDetails) => {
    logger.info('authenticate', 'data received');
    successfulRequest(res, userDetails);
  }).catch((error) => {
    logger.error('authenticate', 'exception occured', error);
    invalidRequest(res, error.message);
  });
}

module.exports = {
  registerUser,
  authenticate
};
