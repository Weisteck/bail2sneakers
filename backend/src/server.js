/**
 * ----------------------------------------------------------------
 *  NOTE *
 *  ******
 *
 * Command for connect to /login
 * curl http://localhost:5000/api/authentification/login -c cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"test@gmail.com", "password":"trouDuCul"}' -L
 *
 * Problems: redirect to/api/authentification/authrequired is not working
 *
 *
 * With insomnia, redirect works, but without the file cookie-file.txt, it's seem that log in not working
 */











const bcrypt = require("bcrypt");
const comment = require("./router/comment")
const product = require("./router/product")
const cart = require("./router/cart")
const user = require("./router/user")
const authentification = require("./router/authentification")
const express = require('express')
const CONFIG = require('@yarn-monorepo/config')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const connectDB = require('../config/connectDB')
const { exec } = require("child_process");
const path = require("path");
const morgan = require("morgan")
const passport = require("passport");
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users')
const { v4: uuidv4 } = require('uuid');
const FileStore = require('session-file-store')(session);
const ObjectId = require('mongoose').Types.ObjectId;


const app = express();

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ "mail": email })
      .then(response => {
        const user = response
        if (!user) {
          return done(null, false, { message: 'Invalid credentials.\n' });
        }
        if (!bcrypt.compare(password, user.password)) {
          return done(null, false, { message: 'Invalid credentials.\n' });
        }

        return done(null, user);
      })
      .catch(error => done(error));
  }
));

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  genid: (req) => {
    return uuidv4() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log("serializeUser", user)
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser, id", id)
  User.findOne({ "_id": new ObjectId(id) })
    .then(res => {
      console.log("User =", res)
      return done(null, res)
    })
    .catch(error => {
      console.log("catch error", error)
      return done(error, false)
    })
});

connectDB()

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./images'))
app.use(cors({
  origin: 'http://localhost:3001'
}))


app.use(history())
app.use('/', express.static(path.join(__dirname, CONFIG.distPath)));


app.use('/api/user', user);
app.use('/api/comment', comment)
app.use('/api/cart', cart)
app.use('/api/product', product)
app.use('/api/authentification', authentification)


app.listen(process.env.PORT || 5000, () => {
  // console.clear()
  console.log(`Listening on port ${ process.env.PORT || 5000 }`)
})
