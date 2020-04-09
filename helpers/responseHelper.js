/**
 * @param {*} req
 * @param {*} res
 */
function successfulRequest(res, payload) {
  res.status(200);
  res.send({
    success: true,
    message: 'Successful response',
    payload
  });
}

/**
 * @param {*} req
 * @param {*} res
 */
function invalidRequest(res, payload) {
  res.status(401);
  res.send({
    success: false,
    message: 'Bad request',
    payload
  });
}

/**
 * @param {*} req
 * @param {*} res
 */
function notFoundRequest(res, payload) {
  res.status(404);
  res.send({
    success: false,
    message: 'Not found',
    payload
  });
}

/**
 * @param {*} req
 * @param {*} res
 */
function serverErrorRequest(res, payload) {
  res.status(500);
  res.send({
    success: false,
    message: 'Internal server Error',
    payload
  });
}

module.exports = {
  invalidRequest,
  notFoundRequest,
  successfulRequest,
  serverErrorRequest
};
