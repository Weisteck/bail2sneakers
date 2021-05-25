const Basket = require('../models/Basket')
const ObjectId = require('mongoose').Types.ObjectId;

const postBasketRepository = (basket) => {
	return Basket.create(basket)
		.then(() => true)
		.catch(err => console.error(err))
}

const getAllBasketsRepository = async () => {
	return Basket.find()
}

const getBasketByIdRepository = (id) => {
	return Basket.findOne({ "_id": new ObjectId(id) })
}

const putBasketRepository = (id, basket) => {
	return Basket.updateOne({
			"_id": new ObjectId(id)
		},
		basket
	)
}

const deleteBasketRepository = (id) => {
	return Basket.deleteOne({ "_id": new ObjectId(id) })
}

module.exports = {
	postBasketRepository: postBasketRepository,
	getAllBasketsRepository: getAllBasketsRepository,
	getBasketByIdRepository: getBasketByIdRepository,
	putBasketRepository: putBasketRepository,
	deleteBasketRepository: deleteBasketRepository
}
