'use strict';

const jwt = require('jsonwebtoken');

function sign (payload, secretOrPrivateKey, options, callback) {
  return jwt.sign(payload, secretOrPrivateKey, options, callback);
}

function verify (signature, secretOrKey) {
  return jwt.verify(signature, secretOrKey);
}

function createToken (payload, secretOrPrivateKey, options, callback) {
  const defaultPayload = {
    expiresIn: 60,
    audience: 'lzz',
    algorithm: 'RS256',
    issuer: 'egg-server',
    subject: 'subject',
    jwtid: 'egg-first',
  };
  Object.assign(defaultPayload, payload);
  return sign(defaultPayload, secretOrPrivateKey, options, callback);
}

module.exports = {
  verify,
  createToken,
};
