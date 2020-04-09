const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const getLogger = require('../utils/logger');
const logger = getLogger('userService');
const sendToken = require('../helpers/sendToken');
const { isConnected } = require('../utils/database');
const User = require('../schema/user');

function registerUser(data) {
  logger.info('Inside registerUser');
  return new Promise((resolve, reject) => {
    isConnected().then(() => { logger.info('Database connected'); });
    User.findOne({ $or: [{ username: data.username }, { email: data.email }] })
      .exec()
      .then(async doc => {
        if (doc) {
          const error = { status: 409, message: 'User exists' };
          logger.error(error.message);
          reject(error);
        } else {
          const { username, email, password } = data;

          const salt = bcrypt.genSaltSync(10);
          bcrypt.hash(password, salt, null, (error, hash) => {
            if (error) {
              logger.info('bcrypt fail');
              error.status = 500;
              reject(error);
            }

            const user = new User({
              _id: mongoose.Types.ObjectId(),
              username,
              email,
              password: hash,
              createdAt: new Date().getTime()
            });

            user.save()
              .then(newUser => {
                return sendToken(newUser, resolve);
              })
              .catch(error => {
                logger.error('User save failed');
                error.status = 500;
                reject(error);
              });
          });
        }
      })
      .catch(error => {
        logger.error('User findOne failed');
        error.status = 500;
        reject(error);
      });
  });
};

function authenticate(data) {
  logger.info('Inside authenticate');
  return new Promise((resolve, reject) => {
    isConnected().then(() => { logger.info('Database connected'); });
    User.findOne({ $or: [{ username: data.username }, { email: data.email }] })
      .exec()
      .then(user => {
        if (!user) {
          const error = { status: 404, message: 'User not found' };
          logger.info(error.message);
          reject(error);
        }

        bcrypt.compare(data.password, user.password, (error, result) => {
          if (error) {
            error.status = 401;
            logger.error(error.message);
            reject(error);
          }

          if (result) {
            return sendToken(user, resolve);
          } else {
            const err = { status: 401, message: 'Password did not match' };
            logger.error(err.message);
            reject(err);
          }
        });
      })
      .catch(error => {
        error.status = 404;
        logger.error(error.message);
        reject(error);
      });
  });
};

function getUserInfo(req) {
  return new Promise((resolve, reject) => {
    isConnected().then(() => { logger.info('Database connected'); });
    logger.info('getUserInfo');

    const user = req.user;
    logger.info('user', user);

    User.findById(user._id).then(doc => {
      if (!doc) {
        const error = { status: 404, message: 'User not found' };
        logger.error(error.message);
        reject(error);
      }

      resolve(doc);
    });
  });
};

module.exports = {
  registerUser,
  authenticate,
  getUserInfo
};
