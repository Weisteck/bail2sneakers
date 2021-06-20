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


app.listen(process.env.PORT || 5000, () => {
	console.clear()
	console.log(`Listening on port ${ process.env.PORT || 5000 }`)
})
