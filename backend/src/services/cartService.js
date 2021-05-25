const {
	postCartRepository,
	getAllCartsRepository,
	getCartByIdRepository,
	putCartRepository,
	deleteCartRepository
} = require('../repositories/cartRepository')

const { removeItemFromStockRepository, getProductByIdRepository } = require('../repositories/productRepository')

const postCartService = async (selectedProducts) => {
	const newCart = {
		selectedProducts: selectedProducts,
		userId: null,
		order: {
			history: {
				progressedAt: new Date(),
				orderedAt: null,
				orderedPreparationAt: null,
				deliveredAt: null,
				endedAt: null,
				canceledAt: null,
				operatorId: null
			},
			priceExclTax: selectedProducts.price,
			address: {
				city: null,
				address: null,
				zipCode: null,
				country: null
			}
		}
	}


	getProductByIdRepository(selectedProducts.productId)
		.then(res => {
			const newVariants = res.variants
				.filter(variant => {
					return variant.sizes.map(size => {
						console.log(size, selectedProducts.size)
						if (size.size === selectedProducts.size)
							size.stock--
					})
				})
				// .filter(variant => variant.color === selectedProducts.color)
				// .map(variant => {
				// 	return variant.sizes.filter(size => size === selectedProducts.size)
				// })

			newVariants.forEach(variant => console.log(variant))
			// removeItemFromStockRepository(product.productId,)
		})


	// return await postCartRepository(newCart)
	// 	.then(res => res)
	// 	.catch(err => console.error(err))
}

const getAllCartsService = async () => {
	return await getAllCartsRepository()
		.then(res => res)
		.catch(err => console.error(err))
}

const getCartByIdService = async (id) => {
	return await getCartByIdRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

const removeProductFromCartService = async (id, productToEdit) => {
	const editedCart = {
		selectedProducts: [],
		userId: null,
		order: {
			history: {
				progressedAt: new Date(),
				orderedAt: null,
				orderedPreparationAt: null,
				deliveredAt: null,
				endedAt: null,
				canceledAt: null,
				operatorId: null
			},
			priceExclTax: productToEdit.price,
			address: {
				city: null,
				address: null,
				zipCode: null,
				country: null
			}
		}
	}

	await getCartByIdService(id)
		.then(res => {
			editedCart.selectedProducts = res.selectedProducts.filter(product => {
				if (product._id.toString() !== productToEdit._id.toString())
					return product
			})
			editedCart.userId = res.userId
			editedCart.order = {
				status: res.order.status,
				priceExclTax: res.order.priceExclTax,
				address: res.order.address,
			}
		})

	return await putCartRepository(id, editedCart)
		.then(res => res)
		.catch(err => console.error(err))
}

const addProductToCartService = async (id, productToEdit) => {
	const editedCart = {
		selectedProducts: [],
		userId: null,
		order: {
			history: {
				progressedAt: new Date(),
				orderedAt: null,
				orderedPreparationAt: null,
				deliveredAt: null,
				endedAt: null,
				canceledAt: null,
				operatorId: null
			},
			priceExclTax: productToEdit.price,
			address: {
				city: null,
				address: null,
				zipCode: null,
				country: null
			}
		}
	}

	await getCartByIdService(id)
		.then(res => {
			const newSelectedProduct = res.selectedProducts
			newSelectedProduct.push(productToEdit)

			editedCart.selectedProducts = newSelectedProduct
			editedCart.userId = res.userId
			editedCart.order = {
				status: res.order.status,
				priceExclTax: res.order.priceExclTax,
				address: res.order.address,
			}
		})


	/*	return await putCartRepository(id, editedCart)
			.then(res => res)
			.catch(err => console.error(err))*/
}

const deleteCartService = async (id) => {
	return await deleteCartRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

module.exports = {
	postCartService: postCartService,
	getAllCartsService: getAllCartsService,
	getCartByIdService: getCartByIdService,
	removeProductFromCartService: removeProductFromCartService,
	addProductToCartService: addProductToCartService,
	deleteCartService: deleteCartService
}
