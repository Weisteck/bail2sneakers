const comment = require("./router/comment")
const product = require ("./router/product")
const cart = require ("./router/cart")
const user = require("./router/user")
const payment = require("./router/payment")
const express = require('express')
const CONFIG = require('@yarn-monorepo/config')
const history = require('connect-history-api-fallback')
const connectDB = require('../config/connectDB')
const path = require("path");
const morgan = require("morgan")


const app = express();


connectDB()

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./images'))


app.use(history())
app.use('/', express.static(path.join(__dirname, CONFIG.distPath)));


app.use('/api/user', user);
app.use('/api/comment', comment)
app.use('/api/cart', cart)
app.use('/api/product', product)
app.use('/api/payment', payment)

const bodyParser = require('body-parser');
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
	console.clear()
	console.log(`Listening on port ${ process.env.PORT || 5000 }`)
})
