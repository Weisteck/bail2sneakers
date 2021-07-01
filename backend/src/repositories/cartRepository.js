const Cart = require('../models/Cart')
const ObjectId = require('mongoose').Types.ObjectId;

const postCartRepository = async (cart) => {
	try {
		const productCreated = await Cart.create(cart)
		return getCartByIdRepository(productCreated._id)
	} catch (e) {
		console.error(e)
	}
}

const getAllCartsRepository = async () => {
  return Cart.find()
}

const getCartByIdRepository = (id) => {
  return Cart.findOne({ "_id": new ObjectId(id) })
}

const getCartByUserIdRepository = (userId) => {
  return Cart.find({ "userId": new ObjectId(userId) })
}

const getCartsByStatusRepository = async (status) => {
  const carts = await Cart.find({ [`order.history.${ status }`]: { $ne: null } })
  console.log(carts)
  return carts
}

const putCartRepository = (id, cart) => {
  return Cart.updateOne({
      "_id": new ObjectId(id)
    },
    cart
  )
}

const deleteCartRepository = (id) => {
  return Cart.deleteOne({ "_id": new ObjectId(id) })
}

module.exports = {
  postCartRepository: postCartRepository,
  getAllCartsRepository: getAllCartsRepository,
  getCartByIdRepository: getCartByIdRepository,
  getCartsByStatusRepository: getCartsByStatusRepository,
  putCartRepository: putCartRepository,
  deleteCartRepository: deleteCartRepository,
  getCartByUserIdRepository: getCartByUserIdRepository
}
