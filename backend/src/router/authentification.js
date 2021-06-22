const express = require('express')
const router = express.Router()
const passport = require("passport")

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info)
      return res.send(info.message)

    if (err)
      return next(err);

    if (!user)
      return res.redirect('/login');

    req.login(user, (err) => {
      if (err)
        return next(err);

      return res.redirect('/api/authentification/authrequired');
    })
  })(req, res, next);
})

router.get('/authrequired', (req, res) => {
  req.isAuthenticated()
    ? res.send('you hit the authentication endpoint\n')
    : res.send("you are not connected")
})

router.get('/login', (req, res) => {
  res.send(`You got the login page!\n`)
})

module.exports = router;
