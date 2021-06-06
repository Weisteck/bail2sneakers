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

// proxy middleware options
const options = {
  target: 'https://bail2sneakers.herokuapp.com/', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api/old-path': '/api/new-path', // rewrite path
//     '^/api/remove/path': '/path', // remove base path
//   },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'dev.localhost:3000': 'http://localhost:5000',
  },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

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

// mount `exampleProxy` in web server
app.use('/api', exampleProxy);


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

app.listen(process.env.PORT || 5000, HOST, () => {
	console.clear()
	console.log(`Listening on ${HOST}:${ process.env.PORT || 5000 }`)
})
