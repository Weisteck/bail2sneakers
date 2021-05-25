const express = require('express')
const router = express.Router()

const {
	postProductService,
	getAllProductsService,
	getProductByIdService,
	putProductService,
	deleteProductService
} = require('../services/productService');

router.get('/get-all', (req, res) => {
	getAllProductsService()
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.get('/', (req, res) => {
	getProductByIdService(req.query.id)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.post('/', (req, res) => {
	postProductService(req.body)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.put('/', (req, res) => {
	putProductService(req.query.id, req.body)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.delete('/', (req, res) => {
	deleteProductService(req.query.id)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

module.exports = router
