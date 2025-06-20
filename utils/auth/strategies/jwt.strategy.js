const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(opts, (jwtPayload, done) => {
  return done(null, jwtPayload);
});

module.exports = JwtStrategy;
