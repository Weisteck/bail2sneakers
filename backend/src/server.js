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


connectDB()

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


app.listen(process.env.PORT || 5000, () => {
	console.clear()
	console.log(`Listening on ${ process.env.PORT || 5000 }`)
})
