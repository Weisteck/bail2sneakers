const {
	postBasketRepository,
	getAllBasketsRepository,
	getBasketByIdRepository,
	putBasketRepository,
	deleteBasketRepository
} = require('../repositories/basketRepository')

const postBasketService = async (basket) => {
	const newBasket = {
		selectedProducts: basket,
		userId: null,
		order: {
			status: "In progress",
			priceExclTax: basket.price,
			address: {
				city: null,
				address: null,
				zipCode: null,
				country: null
			}
		}
	}

	return await postBasketRepository(newBasket)
		.then(res => res)
		.catch(err => console.error(err))
}

const getAllBasketsService = async () => {
	return await getAllBasketsRepository()
		.then(res => res)
		.catch(err => console.error(err))
}

const getBasketByIdService = async (id) => {
	return await getBasketByIdRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

const putBasketService = async (id, basket) => {
	return await putBasketRepository(id, basket)
		.then(res => res)
		.catch(err => console.error(err))
}

const deleteBasketService = async (id) => {
	return await deleteBasketRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

module.exports = {
	postBasketService: postBasketService,
	getAllBasketsService: getAllBasketsService,
	getBasketByIdService: getBasketByIdService,
	putBasketService: putBasketService,
	deleteBasketService: deleteBasketService
}
