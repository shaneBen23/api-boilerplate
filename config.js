module.exports = {
  env: {
    JWT_KEY: 'secret',
    SERVER_TIMEOUT: 1000000,
    PORT: 3000
  },
  db: {
    MONGO_URL_SERVICE: 'mongodb://nodeadmin:nodepwd@localhost:27017/nodedb?authSource=admin',
    MONGO_CONFIG: { useNewUrlParser: true, poolSize: 20, useUnifiedTopology: true }
  },
  API1_HOST_URL: 'http://<domain1>',
  API2_HOST_URL: 'http://<domain2>',
  API3_HOST_URL: 'http://<domain3>',
  endPoints: {
    api1: {
      user: {
        default: '/users',
        authenticate: '/users/authenticate'
      }
    },
    api2: {
      user: {
        default: '/users',
        authenticate: '/users/authenticate'
      }
    },
    api3: {
      user: {
        default: '/users',
        authenticate: '/users/authenticate'
      }
    }
  },
  localStorage: {
    USER: 'user'
  },
  tokens: {
    api1: 'api1Token',
    api2: 'api1Token',
    api3: 'api1Token'
  }
};
