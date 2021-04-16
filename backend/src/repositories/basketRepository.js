import Basket from '../models/Basket'

const postBasketRepository = (basket) => {
	const newBasket = new Basket(basket)

	newBasket.save()
		.then(() => true)
		.catch(err => console.error(err))
}

export {
	postBasketRepository
}
