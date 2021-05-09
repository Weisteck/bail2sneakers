const {
	PostProductsRepository,
	getAllProductsRepository,
	getProductsByIdRepository,
	putProductsRepository,
	deleteProductsRepository
} = require('../repositories/ProductsRepository')

const postProductsService = async (products) => {
	return await PostProductsRepository(products)
		.then(res => res)
		.catch(err => console.error(err))
}

const getAllProductsService = async () => {
	return await getAllProductsRepository()
		.then(res => res)
		.catch(err => console.error(err))
}

const getProductsByIdService = async (id) => {
	return await getProductsByIdRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

const putProductsService = async (id, products) => {
	return await putProductsRepository(id, products)
		.then(res => res)
		.catch(err => console.error(err))
}

const deleteProductsService = async (id) => {
	return await deleteProductsRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

module.exports = {
	postProductsService: postProductsService,
	getAllProductsService: getAllProductsService,
	getProductsByIdService: getProductsByIdService,
	putProductsService: putProductsService,
	deleteProductsService: deleteProductsService
}