const User = require('../src/models/users')
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const ObjectId = require('mongoose').Types.ObjectId;

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    password: "password",
    passReqToCallback: true
  },
  function (req, email, local_pw, done) {
    process.nextTick(function () {
      User.findOne({ "mail": req.mail })
        .then((user, err) => {
          if (err) return done(err)

          if (user) return done(null, false, 'That email is already taken')
          else {

          }
        })
    })
  }
))
