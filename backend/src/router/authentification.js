const express = require('express');
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt")
const User = require('../models/users')

/*router.post('/login', async (req, res) => {
  const user = await User.findOne({ "mail": req.body.username })

  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password)

    if (result) {
      const newUser = {
        id: user._id,
        mail: user.mail
      }

      res.send(newUser)
    } else
      res.end("wrong password")
  } else {
    res.end("utilisateur non trouvé")
  }
});*/

router.post('/login', (req, res, next) => {


  passport.authenticate('local', (err, user, info) => {
    if (info) {
      console.log("info", info)
      return res.send(info.message)
    }
    if (err) {
      console.log("err", err)
      return next(err);
    }
    if (!user) {
      console.log("!user")
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      if (err) {
        console.log("req.login err")
        return next(err);
      }

      console.log("login success", user)
      // res.send("login success")
      return res.redirect('/api/authentification/authrequired');
    })
  })(req, res, next);
})


router.get('/authrequired', (req, res) => {
  console.log("in authrequired", req.isAuthenticated())

  if (req.isAuthenticated()) {
    console.log("you hit the authentication endpoint\n")
    res.send('you hit the authentication endpoint\n')
  } else {
    console.log("you are not connected")
    res.send("you are not connected")
    // res.redirect('/')
  }
})

router.get('/login', (req, res) => {
  res.send(`You got the login page!\n`)
})


module.exports = router;
