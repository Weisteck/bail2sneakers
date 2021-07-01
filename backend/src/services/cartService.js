const {
  postCartRepository,
  getAllCartsRepository,
  getCartByIdRepository,
  getCartsByStatusRepository,
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
        progressedAt: new Date('2021-06-14T03:24:00'),
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


  const product = await getProductByIdRepository(selectedProducts.productId)

  const newVariants = product.variants
    .map(({ color, sizes }) => ({
        color: color,
        sizes: sizes.map(({ size, stock }) => ({
          size: size,
          stock: size === selectedProducts.size ? stock - 1 : stock
        }))
      })
    )

  removeItemFromStockRepository(selectedProducts.productId, newVariants)
    .then(res => console.log(res))
    .catch(err => console.err(err))


  return await postCartRepository(newCart)
    .then(res => res)
    .catch(err => console.error(err))
}

const putCartService = async (cartId, data) => {
  try {
    const getCartResponse = await getCartByIdService(cartId)

    if (data.status !== null)
      getCartResponse.order.history[status] = new Date()
    else {
      getCartResponse.userId = data.userId
      getCartResponse.order.address = data.userAddress
    }

    return await putCartRepository(cartId, getCartResponse)
  } catch (e) {
    console.error(e)
  }
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

const getCartByStatusService = async (status) => {
  try {
    return await getCartsByStatusRepository(status)
  } catch (e) {
    return { status: 404, message: e }
  }
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

  const cartResponse = await getCartByIdService(id)

  const newSelectedProduct = cartResponse.selectedProducts

  newSelectedProduct.push(productToEdit)

  editedCart.selectedProducts = newSelectedProduct
  editedCart.userId = cartResponse.userId
  editedCart.order = {
    status: cartResponse.order.status,
    priceExclTax: cartResponse.order.priceExclTax,
    address: cartResponse.order.address,
  }


  return putCartRepository(id, editedCart);
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
  getCartByStatusService: getCartByStatusService,
  removeProductFromCartService: removeProductFromCartService,
  addProductToCartService: addProductToCartService,
  deleteCartService: deleteCartService,
  putCartService: putCartService
}
