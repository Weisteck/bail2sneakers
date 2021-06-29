const bcrypt = require("bcrypt")
const comment = require("./router/comment")
const product = require("./router/product")
const cart = require("./router/cart")
const user = require("./router/user")
const authentication = require("./router/authentication")
const payment = require("./router/payment")
const express = require('express')
const CONFIG = require('@yarn-monorepo/config')
const history = require('connect-history-api-fallback')
const connectDB = require('../config/connectDB')
const path = require("path")
const morgan = require("morgan")
const passport = require("passport")
const bodyParser = require("body-parser")
const session = require("express-session")
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/users')
const { v4: uuidv4 } = require('uuid')
const FileStore = require('session-file-store')(session)
const ObjectId = require('mongoose').Types.ObjectId


const app = express()

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ "mail": email })
      .then(response => {
        const user = response

        if (!user)
          return done(null, false, { message: 'Incorrect username.\n' })

        bcrypt.compare(password, user.password, (err, result) => {
          if (err)
            return done(null, false, { message: 'ERROR.\n' + err })

          if (!result)
            return done(null, false, { message: 'Incorrect password.\n' })

          return done(null, user)
        })
      })
  }
))

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
app.use(passport.initialize())
app.use(passport.session())

// tell passport how to serialize the user
passport.serializeUser((user, done) => done(null, user._id))

passport.deserializeUser((id, done) => {
  User.findOne({ "_id": new ObjectId(id) })
    .then(res => {
      const user = {}

      user.id = res._id
      user.mail = res.mail
      user.lastName = res.lastName
      user.firstName = res.firstName
      user.role = res.role

      return done(null, user)
    })
    .catch(error => done(error, false))
})

connectDB()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./images'))


app.use(history())
app.use('/', express.static(path.join(__dirname, CONFIG.distPath)))


app.use('/api/user', user)
app.use('/api/comment', comment)
app.use('/api/cart', cart)
app.use('/api/product', product)
app.use('/api/authentication', authentication)
app.use('/api/payment', payment)

const stripe = require('stripe')('sk_test_51J4S4HC2Kud8irFw2YvIgWGrZczNQ2PN1kpq59XMQTtHcUyjxpxEbrJbq0BRE8JW2YXDSzqKfdFVFDJ1pfLKqVgK00tsHHEtW7')

const endpointSecret = 'whsec_AmAAu6LPRulEGLCuuwmj30U3klOgIIzw';

const fulfillOrder = (session) => {
	// TODO: fill me in
	console.log("Fulfilling order", session);
}

app.get('/test', (req, res) => {
	res.send("test")
})

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
	const payload = request.body;
	const sig = request.headers['stripe-signature'];

	let event;

	try {
		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
	} catch (err) {
		return response.status(400).send(`Webhook Error: ${err.message}`);
	}

	// Handle the checkout.session.completed event
	if (event.type === 'checkout.session.completed') {
		console.log("-------------SESSION COMPLETED------------")
		const session = event.data.object;

		// Fulfill the purchase...
		fulfillOrder(session);
	}

	response.status(200);
});
app.listen(process.env.PORT || 5000, () => {
  // console.clear()
  console.log(`Listening on port ${ process.env.PORT || 5000 }`)
})
