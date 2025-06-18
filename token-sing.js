const jwt = require('jsonwebtoken');

const secret = 'ESPESecreat';

const payload = {
  sub: '1',
  rol: 'customer',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
