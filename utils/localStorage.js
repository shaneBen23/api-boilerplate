function getLocalStorage() {
  if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage(`./localStorage`);
  }
  return localStorage;
}

module.exports = {
  getLocalStorage
}