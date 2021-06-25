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
      return res.redirect('/login')

    req.login(user, (err) => {
      if (err)
        return next(err)
      console.log("login", req.user)

      return res.redirect('/api/authentication/profile')
    })
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  console.log("session before destroy : ", req.session)
  req.logout()
  req.session.destroy()
  console.log("session after destroy : ", req.session)
  //res.send("You are disconnected")
  res.send("session endpoint")
})

router.get('/profile', (req, res) => {
  console.log("user: ", req.user)
  if (req.isAuthenticated()) {
    if (req.user)
      res.send(req.user)
    else {
      req.session.destroy()
      res.send("no req.user")
    }
  } else {
    req.session.destroy()
    res.status(403)
    res.send("Error, redirected to /prodile but you are not connected")
  }
})

module.exports = router
