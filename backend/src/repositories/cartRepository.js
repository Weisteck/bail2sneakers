const Cart = require('../models/Cart')
const ObjectId = require('mongoose').Types.ObjectId;

const postCartRepository = (cart) => {
  return Cart.create(cart)
    .then((res) => getCartByIdRepository(res._id)
      .then(res => res)
      .catch(err => console.error(err))
    )
    .catch(err => console.error(err))
}

const getAllCartsRepository = async () => {
  return Cart.find()
}

const getCartByIdRepository = (id) => {
  return Cart.findOne({ "_id": new ObjectId(id) })
}

const getCartsByStatusRepository = async (status) => {
  return await Cart.find({ [`order.history.${status}`]: null })
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
  deleteCartRepository: deleteCartRepository
}
