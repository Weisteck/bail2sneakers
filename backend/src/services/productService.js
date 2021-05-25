const {
	postProductRepository,
	getAllProductsRepository,
	getProductByIdRepository,
	putProductRepository,
	deleteProductRepository
} = require('../repositories/productRepository')

const postProductService = async (products) => {
	return await postProductRepository(products)
		.then(res => res)
		.catch(err => console.error(err))
}

const getAllProductsService = async () => {
	return await getAllProductsRepository()
		.then(res => res)
		.catch(err => console.error(err))
}

const getProductByIdService = async (id) => {
	return await getProductByIdRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

const putProductService = async (id, products) => {
	return await putProductRepository(id, products)
		.then(res => res)
		.catch(err => console.error(err))
}

const deleteProductService = async (id) => {
	return await deleteProductRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

module.exports = {
	postProductService: postProductService,
	getAllProductsService: getAllProductsService,
	getProductByIdService: getProductByIdService,
	putProductService: putProductService,
	deleteProductService: deleteProductService
}
