const jwt = require('jsonwebtoken');

const secret = 'ESPESecreat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTAyNTUxNDJ9.0MENGY6qvUqgRxkuXIubOroHna3L_Cy6Br81VXXd5BI';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
