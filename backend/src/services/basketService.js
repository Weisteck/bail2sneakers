import { postBasketRepository } from "../repositories/basketRepository";

const postBasketService = (basket) => {
	postBasketRepository(basket)
}

export {
	postBasketService
}
