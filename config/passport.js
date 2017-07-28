const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./database');

module.exports = function(passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, next) => {
      User.getUserById(jwt_payload._doc._id, (err, user) => {
        if(err) {
            return next(err, false);
        }
        if(user) {
            return next(null, user);
        } else {
            return next(null, false);
        }
      });
  }));
}
