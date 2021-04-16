const express = require('express')
const CONFIG = require('@yarn-monorepo/config')

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./images'))

app.get('/', (req, res) => {
	res.end('hello world!')
})

app.listen(CONFIG.PORT, () => {
	console.clear()
	console.log(`Listening on ${CONFIG.PORT}`)
})
