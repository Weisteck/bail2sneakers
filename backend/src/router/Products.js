const express = require('express')
const router = express.Router()


const {
	postProductsService,
	getAllProductsService,
	getProductsByIdService,
	putProductsService,
	deleteProductsService
} = require('../services/productsService');

router.get('/get-all', (req, res) => {
	getAllProductsService()
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.get('/', (req, res) => {
	getProductsByIdService(req.query.id)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.post('/', (req, res) => {
	postProductsService(req.body)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.put('/', (req, res) => {
	putProductsService(req.query.id, req.body)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.delete('/', (req, res) => {
	deleteProductsService(req.query.id)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

module.exports = router