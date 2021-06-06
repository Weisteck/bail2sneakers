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

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./images'))
app.use(cors({
	origin: 'http://localhost:3001'
}))

app.use(
	'/api',
	createProxyMiddleware({
		target: CONFIG.API_ROOT_URL || "127.0.0.1:5000",
		changeOrigin: true,
		// ws: true,
		// pathRewrite: {
		// 	'^/api': '',
		// },
	})
)

app.use(history())
app.use('/', express.static(path.join(__dirname, CONFIG.distPath)));

connectDB()

app.get('/')

app.use('/user', user);
app.use('/comment', comment)
app.use('/cart', cart)
app.use('/product', product)


app.listen(process.env.PORT || 5000, () => {
	console.clear()
	console.log(`Listening on ${ process.env.PORT || 5000 }`)
})
