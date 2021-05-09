import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import CreateBasket from "../views/basket/CreateBasket.vue"
import GetAllProduct from "../views/product/GetAllProducts.vue"

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	// Basket
	{
		path: '/basket/create',
		name: 'createBasket',
		component: CreateBasket
	},

	// Product
	{
		path: '/product/get-all',
		name: 'getAllProducts',
		component: GetAllProduct
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes // raccourci pour `routes: routes`
})

/*const router = createRouter({
	//history: createWebHashHistory(process.env.BASE_URL),
	routes
})*/


export default router
