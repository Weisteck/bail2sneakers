const Product = require('../models/Product');
const ObjectId = require('mongoose').Types.ObjectId;

const postProductRepository = async (product) => {
	return Product.create(product)
		.then(() => true)
		.catch(err => console.error(err))
}

const getAllProductsRepository = async () => {
	return Product.find()
}

const getProductByIdRepository = async (id) => {
	return Product.findOne({ "_id": new ObjectId(id) })
}

const putProductRepository = (id, products) => {
	return Product.updateOne({
			"_id": new ObjectId(id)
		},
		products
	)
}

const deleteProductRepository = (id) => {
	return Product.deleteOne({ "_id": new ObjectId(id) })
}


module.exports = {
	postProductRepository: postProductRepository,
	getAllProductsRepository: getAllProductsRepository,
	getProductByIdRepository: getProductByIdRepository,
	putProductsRepository: putProductRepository,
	deleteProductsRepository: deleteProductRepository
}
