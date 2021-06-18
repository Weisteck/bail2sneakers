const express = require('express');
const router = express.Router();
const User = require('../models/users')
const bcrypt = require("bcrypt");
const session = require('express-session')

router.post('/login',  async (req, res) => {
  const user = await User.findOne({ "mail": req.body.username })

  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password)

    if (result)
      res.end("password ok")
    else
      res.end("wrong password")
  } else {
    res.end("utilisateur non trouvé")
  }
});

module.exports = router;
