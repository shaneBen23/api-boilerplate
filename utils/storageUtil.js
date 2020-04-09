
const config = require('../config');
const { getLocalStorage } = require('./localStorage');

/**
 * Get object from server localStorage
 * @param {string} name
 */
function getObjectFromStorage(name) {
  const localStorage = getLocalStorage();
  return JSON.parse(localStorage.getItem(name)) || '';
}

/**
 * Store object in server localStorage
 * @param {string} name
 * @param {*} storeObject
 */
function storeObjectInStorage(name, storeObject) {
  const localStorage = getLocalStorage();
  const storageObject = JSON.stringify(storeObject);
  localStorage.setItem(name, storageObject);
}

/**
 * Get item from server localStorage
 * @param {string} name
 */
function getItemFromStorage(name) {
  const localStorage = getLocalStorage();
  return localStorage.getItem(name) || '';
}

/**
 * Store item in server localStorage
 * @param {string} name
 * @param {string} item
 */
function storeItemInStorage(name, item) {
  const localStorage = getLocalStorage();
  localStorage.setItem(name, item);
}

/**
 * Remove element from server localStorage
 * @param {string} name
 */
function removeFromStorage(name) {
  const localStorage = getLocalStorage();
  localStorage.removeItem(name);
}

/**
 * Get element from configuration file
 * @param {string} name
 */
function getFromConfig(item) {
  return config[item];
}

export default {
  getObjectFromStorage,
  storeObjectInStorage,
  getItemFromStorage,
  storeItemInStorage,
  removeFromStorage,
  getFromConfig
};
