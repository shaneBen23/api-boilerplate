const jwt = require('jsonwebtoken');
const config = require('../config');

function sendToken(user, resolve) {
  const token = jwt.sign({
    _id: user._id,
    email: user.email
  },
  config.env.JWT_KEY,
  {
    expiresIn: '1h'
  });

  const response = {
    expiresIn: 3600,
    token
  };

  resolve(response);
}

module.exports = sendToken;
