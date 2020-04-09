const jwt = require('jsonwebtoken');
const helper = require('../utils/helper');
const logger = helper.getLogger('authCheck');
const { invalidRequest } = require('../helpers/responseHelper');
const { isConnected } = require('../helpers/dbHelpers');
const User = require('../schema/user');
const config = require('../utils/config.json');

const UNAUTHORISED = 'Unauthorised';
const USER_NOT_FOUND = 'User not found';

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    logger.error('Auth failed, no authorization header');
    res.status(401);
    return invalidRequest(res, UNAUTHORISED);
  }

  let token = req.headers.authorization;

  if (token.indexOf('Bearer') === 0) {
    token = token.split(' ')[1];
  }

  return jwt.verify(token, config.JWT_KEY, (error, decoded) => {
    if (error) {
      logger.error('Could not be decoded');
      res.status(503);
      return invalidRequest(res, UNAUTHORISED);
    }

    isConnected().then(() => { logger.info('Database connected'); });

    User.findById(decoded._id).exec()
      .then(user => {
        if (!user) {
          const error = { message: USER_NOT_FOUND };
          res.status(404);
          logger.error(error.message);
          return invalidRequest(res, error.message);
        }

        req.user = user;
        return next();
      })
      .catch(error => {
        logger.error('Mongoose Error');
        res.status(500);
        return invalidRequest(res, error.message);
      });
  });
};
