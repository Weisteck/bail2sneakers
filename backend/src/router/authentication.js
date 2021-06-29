const express = require('express')
const router = express.Router()
const passport = require("passport")

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info)
      return res.send(info.message)

    if (err)
      return next(err)

    if (!user)
      res.status(404).send("User not found")

    req.login(user, (err) => {
      if (err)
        return next(err)
      res.status(202).send(req.user)
    })
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.send("logout success")
})

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user)
      res.send(req.user)
    else {
      req.session.destroy()
      res.send("There are no user.")
    }
  } else {
    req.session.destroy()
    res.status(403).send("User is not authenticated.")
  }
})

module.exports = router
