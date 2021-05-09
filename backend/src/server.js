const express = require('express')
const CONFIG = require('@yarn-monorepo/config')
const cors = require('cors')
const app = express();

const connectDB=require('../config/connectDB')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./images'))
app.use(cors())


//connectDB (config)
connectDB()

app.get('/', (req, res) => {
	res.end('hello world!')
})

app.use('/user', require('./router/user'));

app.listen(CONFIG.PORT, () => {
	console.clear()
	console.log(`Listening on ${CONFIG.PORT}`)
})
