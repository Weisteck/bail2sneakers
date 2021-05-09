const comment = require("./router/comment")
const product = require ("./router/product")
const basket = require ("./router/basket")

const express = require('express')
const CONFIG = require('@yarn-monorepo/config')
const cors = require('cors')
const app = express();

const connectDB = require('../config/connectDB')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./images'))
app.use(cors({
	origin: 'http://localhost:3001'
}))


//connectDB (config)
connectDB()

app.get('/', (req, res) => {
	res.end('hello world!')
})


app.use('/comment', comment)
app.use('/basket', basket)
app.use('/product', product)

app.listen(CONFIG.PORT, () => {
	console.clear()
	console.log(`Listening on ${ CONFIG.PORT }`)
})
