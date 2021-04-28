const Products = require('../models/Products');


const PostProductsRepository = (products) => {
	const { save } = new Products(products)

	return save()
		.then(() => true)
		.catch(err => console.error(err))
}

const getAllProductsRepository = async () => {
	return Products.find()
}

const getProductsByIdRepository = (id) => {
	return Products.findOne({ "_id": new ObjectId(id) })
}

const putProductsRepository = (id, products) => {
	return Products.updateOne({
			"_id": new ObjectId(id)
		},
		products
	)
}

const deleteProductsRepository = (id) => {
	return Products.deleteOne({ "_id": new ObjectId(id) })
}


module.exports = {
	PostProductsRepository: PostProductsRepository,
	getAllProductsRepository: getAllProductsRepository,
	getProductsByIdRepository: getProductsByIdRepository,
	putProductsRepository: putProductsRepository,
	deleteProductsRepository: deleteProductsRepository
}