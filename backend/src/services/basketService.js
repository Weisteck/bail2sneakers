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

const removeProductFromBasketService = async (id, productToEdit) => {
	const editedBasket = {
		selectedProducts: [],
		userId: null,
		order: {
			status: "In progress",
			priceExclTax: productToEdit.price,
			address: {
				city: null,
				address: null,
				zipCode: null,
				country: null
			}
		}
	}

	await getBasketByIdService(id)
		.then(res => {
			editedBasket.selectedProducts = res.selectedProducts.filter(product => {
				if (product._id.toString() !== productToEdit._id.toString())
					return product
			})
			editedBasket.userId = res.userId
			editedBasket.order = {
				status: res.order.status,
				priceExclTax: res.order.priceExclTax,
				address: res.order.address,
			}
		})

	return await putBasketRepository(id, editedBasket)
		.then(res => res)
		.catch(err => console.error(err))
}

const addProductToBasketService = async (id, productToEdit) => {
	const editedBasket = {
		selectedProducts: [],
		userId: null,
		order: {
			status: "In progress",
			priceExclTax: productToEdit.price,
			address: {
				city: null,
				address: null,
				zipCode: null,
				country: null
			}
		}
	}

	await getBasketByIdService(id)
		.then(res => {
			const newSelectedProduct = res.selectedProducts
			newSelectedProduct.push(productToEdit)

			editedBasket.selectedProducts = newSelectedProduct
			editedBasket.userId = res.userId
			editedBasket.order = {
				status: res.order.status,
				priceExclTax: res.order.priceExclTax,
				address: res.order.address,
			}
		})

	return await putBasketRepository(id, editedBasket)
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
	removeProductFromBasketService: removeProductFromBasketService,
	addProductToBasketService: addProductToBasketService,
	deleteBasketService: deleteBasketService
}
