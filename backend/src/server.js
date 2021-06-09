const comment = require("./router/comment")
const product = require ("./router/product")
const cart = require ("./router/cart")
const user = require("./router/user")

const express = require('express')
const CONFIG = require('@yarn-monorepo/config')
const cors = require('cors')
const app = express();

const connectDB = require('../config/connectDB')
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./images'))
app.use(cors({
	origin: 'http://localhost:3000'
}))


//connectDB (config)
connectDB()

app.get('/', (req, res) => {
	res.end('hello world!')
})

app.use('/user', user);
app.use('/comment', comment)
app.use('/cart', cart)
app.use('/product', product)


app.listen(PORT, () => {
	console.clear()
	console.log(`Listening on ${ PORT }`)
})
