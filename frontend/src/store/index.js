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
		addProductToBasket(context, payload) {
			console.log("payload :", payload)
			return api.post('/basket', payload)
				.then(res => res)
				.catch(err => console.error(err))
		},
		// #endregion
	},
	modules: {}
})
