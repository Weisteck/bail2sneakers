const express = require('express')
const router = express.Router()

const {
	postBasketService,
	getAllBasketsService,
	getBasketByIdService,
	removeProductFromBasketService,
	addProductToBasketService,
	deleteBasketService
} = require('../services/basketService');

router.get('/get-all', (req, res) => {
	getAllBasketsService()
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.get('/', (req, res) => {
	getBasketByIdService(req.query.id)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.post('/', (req, res) => {
	postBasketService(req.body)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.put('/remove-product', (req, res) => {
	removeProductFromBasketService(req.query.id, req.body)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.put('/add-product', (req, res) => {
	console.log("add product")
	addProductToBasketService(req.query.id, req.body)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.delete('/', (req, res) => {
	deleteBasketService(req.query.id)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

module.exports = router
