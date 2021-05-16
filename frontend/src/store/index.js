import { createStore } from 'vuex'
import { api } from "../api/api";

export default createStore({
	state: {},
	mutations: {},
	actions: {
		// #region Product
		getAllProducts() {
			return api.get('/product/get-all')
				.then(res => res)
				.catch(err => console.error(err))
		},
		getProduct(context, payload) {
			return api.get(`/product?id=${ payload.id }`)
				.then(res => res)
				.catch(err => console.error(err))
		},
		// #endregion

		// #region Basket
		addProductToNewBasket(context, payload) {
			return api.post('/basket', payload)
				.then(res => res)
				.catch(err => console.error(err))
		},

		getBasketById(context, payload) {
			return api.get(`/basket?id=${ payload.id }`)
				.then(res => res)
				.catch(err => console.error(err))
		},

		removeProductFromBasket(context, payload) {
			return api.put(`/basket/remove-product?id=${ payload.basketId }`, payload.productSelected)
				.then(res => res)
				.catch(err => console.error(err))
		},

		addProductToBasket(context, payload) {
			return api.put(`/basket/add-product?id=${ payload.basketId }`, payload.productSelected)
				.then(res => res)
				.catch(err => console.error(err))
		},
		// #endregion
	},
	modules: {}
})
