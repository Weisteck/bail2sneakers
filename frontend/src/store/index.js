import { createStore } from 'vuex'
import { api } from "../api/api";

export default createStore({
	state: {},
	mutations: {},
	actions: {
		// Product
		getAllProducts() {
			return api.get('/product/get-all')
				.then(res => res)
				.catch(err => console.error(err))
		},
		getProduct(context, payload) {
			console.log("id : ", payload.id)
			return api.get(`/product?id=${ payload.id }`)
				.then(res => res)
				.catch(err => console.error(err))
		}
	},
	modules: {}
})
