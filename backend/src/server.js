const comment = require("./router/comment")
const product = require ("./router/product")
const cart = require ("./router/cart")
const user = require("./router/user")
const express = require('express')
const CONFIG = require('@yarn-monorepo/config')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const connectDB = require('../config/connectDB')
const { exec } = require("child_process");
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware')
const morgan = require("morgan")

const app = express();

const HOST = "localhost";
const API_SERVICE_URL = "https://bail2sneakers.herokuapp.com/";


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

app.use('/user', user);
app.use('/comment', comment)
app.use('/cart', cart)
app.use('/product', product)

// Info GET endpoint
app.get('/info', (req, res, next) => {
	res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

/*app.use('', (req, res, next) => {
	if (req.headers.authorization) {
		next();
	} else {
		res.sendStatus(403);
	}
});*/

// Proxy endpoints
app.use('/json_placeholder', createProxyMiddleware({
	target: API_SERVICE_URL,
	changeOrigin: true,
	pathRewrite: {
		[`^/json_placeholder`]: '',
	},
}));

app.listen(process.env.PORT || 5000, () => {
	console.clear()
	console.log(`Listening on port ${ process.env.PORT || 5000 }`)
})
