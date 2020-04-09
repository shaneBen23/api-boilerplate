/**
 * This file helps to provide implementations to perform request operations
 *
 *
 */
const axios = require('axios');

/**
 * Set config defaults when creating the instance
 * @param {*} hostUrl
 * @param {*} token
 */
function initializeInstance(hostUrl, token) {
  let instance = {};
  
  if (hostUrl != undefined) {
    instance = axios.create({
      baseURL: hostUrl,
      timeout: 250000
    });
  }

  if (token != undefined) {
    instance.defaults.headers.common['Authorization'] = token;
  }

  return instance;
}

/**
 * Helps to execute a get request
 * @param {*} hostUrl 
 * @param {*} token 
 * @param {*} endPoint 
 * @param {*} urlParams 
 */
async function getRequest(hostUrl, token, endPoint, urlParams) {
  let instance = initializeInstance(hostUrl, token);

  if (urlParams == undefined) {
    return await instance.get(endPoint);
  }
  else {
    return await instance.get(endPoint + "?" + urlParams);
  }
}

/**
 * Helps to execute a post request
 * @param {*} hostUrl 
 * @param {*} token 
 * @param {*} endPoint 
 * @param {*} data 
 */
async function postRequest(hostUrl, token, endPoint, data) {
  let instance = initializeInstance(hostUrl, token);

  return await instance.post(endPoint, data);
}

/**
 * Helps to execute a put request
 * @param {*} hostUrl 
 * @param {*} token 
 * @param {*} endPoint 
 * @param {*} data 
 */
async function putRequest(hostUrl, token, endPoint, data) {
  let instance = initializeInstance(hostUrl, token);

  return await instance.put(endPoint, data);
}

export default {
  getRequest,
  postRequest,
  putRequest
}
