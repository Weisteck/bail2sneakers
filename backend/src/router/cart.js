const express = require('express')
const router = express.Router()

const {
  postCartService,
  getAllCartsService,
  getCartByIdService,
  removeProductFromCartService,
  addProductToCartService,
  deleteCartService,
  putCartService,
  getCartByStatusService
} = require('../services/cartService');

router.get('/get-all', (req, res) => {
  getAllCartsService()
    .then(result => res.send(result))
    .catch(err => console.error(err))
})

router.get('/', (req, res) => {
  getCartByIdService(req.query.id)
    .then(result => res.send(result))
    .catch(err => console.error(err))
})

router.get('/get-by-status', async (req, res) => {
  try {
    const cartsResponse = await getCartByStatusService(req.query.status)
    res.send(cartsResponse)
  } catch (e) {
    res.status(400)
  }

})

router.post('/', (req, res) => {
  postCartService(req.body)
    .then(result => res.send(result))
    .catch(err => console.error(err))
})

router.put('/remove-product', (req, res) => {
  removeProductFromCartService(req.query.id, req.body)
    .then(result => res.send(result))
    .catch(err => console.error(err))
})

router.put('/add-product', (req, res) => {
  addProductToCartService(req.query.id, req.body)
    .then(result => res.send(result))
    .catch(err => console.error(err))
})

router.put('/', async (req, res) => {
  console.log(req.query)
  try {
    const serviceResponse = await putCartService(req.query.id)

    res.send(serviceResponse)
  } catch (e) {
    console.error(e)
  }
})

router.delete('/', (req, res) => {
  deleteCartService(req.query.id)
    .then(result => res.send(result))
    .catch(err => console.error(err))
})

module.exports = router
