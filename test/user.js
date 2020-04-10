/* eslint-disable no-unused-expressions */
const { assert, expect } = require('chai');
const { describe, before, it } = require('mocha');
const randomstring = require('randomstring');
const { postRequest } = require('../utils/requestHandler');

const domain = 'http://localhost:3000';
// eslint-disable-next-line prefer-const
let user = { username: 'test3', email: 'test3@test.com', password: 'password' };

describe('Test user functions', function() {
  before(function() {
    user.username = randomstring.generate(12);
    user.email = `${user.username}@test.com`;
  });

  it('Register user', function(done) {
    postRequest(domain, '', '/users', user)
      .then((resp) => {
        expect(resp.data.success).to.be.true;
        assert.isOk(resp.data.success, 'User registered');
        done();
      }).catch(err => {
        assert.isOk(err.response.data.success, 'User was not registered');
        done();
      });
  });

  it('Error on user already registered', function(done) {
    postRequest(domain, '', '/users', user)
      .then((resp) => {
        assert.isNotOk(resp.data.success, 'User registered');
        done();
      })
      .catch(err => {
        assert.isNotOk(err.response.data.success, 'User was not registered');
        done();
      });
  });
});
