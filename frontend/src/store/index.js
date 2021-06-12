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

		// #region Cart
		addProductToNewCart(context, payload) {
			return api.post('/cart', payload)
				.then(res => res)
				.catch(err => console.error(err))
		},

		getCartById(context, payload) {
			return api.get(`/cart?id=${ payload.id }`)
				.then(res => res)
				.catch(err => console.error(err))
		},

		removeProductFromCart(context, payload) {
			return api.put(`/cart/remove-product?id=${ payload.cartId }`, payload.productSelected)
				.then(res => res)
				.catch(err => console.error(err))
		},

		addProductToCart(context, payload) {
			return api.put(`/cart/add-product?id=${ payload.cartId }`, payload.productSelected)
				.then(res => res)
				.catch(err => console.error(err))
		},
		// #endregion
	},
	modules: {}
})
