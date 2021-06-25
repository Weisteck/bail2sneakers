const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

const authenticationService = (email, password) => {
  passport.use(new LocalStrategy(
    (done) => {
      User.findOne({ mail: email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
}

module.exports = {
  authenticationService: authenticationService,
}