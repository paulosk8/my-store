const boom = require('boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api-key'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRol(req, res, next) {
  console.log(req.user);
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized('Unauthorized'));
  }
}

function checkRoles(...roles) {
  console.log('Roles', roles);

  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized('Unauthorized'));
    }
  };
}

module.exports = {
  checkApiKey,
  checkAdminRol,
  checkRoles,
};
