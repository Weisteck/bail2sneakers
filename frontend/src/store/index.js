import { createStore } from 'vuex'
import { api } from "../api/api";

export default createStore({
	state: {},
	mutations: {},
	actions: {
		getAllProducts(){
			return api.get('/product/get-all')
				.then(res => res)
				.catch(err => console.error(err))
		}
	},
	modules: {}
})
