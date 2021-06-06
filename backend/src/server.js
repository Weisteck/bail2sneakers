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
const proxy = require("proxy")

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

/*app.use(
  '/api',
  createProxyMiddleware({
    target: process.env.API_ROOT_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/api': '',
    },
  })
)*/

app.use('/api', proxy(API_SERVICE_URL))

app.use('/user', user);
app.use('/api/comment', comment)
app.use('/api/cart', cart)
app.use('/api/product', product)


app.listen(process.env.PORT || 5000, () => {
	console.clear()
	console.log(`Listening on port ${ process.env.PORT || 5000 }`)
})
