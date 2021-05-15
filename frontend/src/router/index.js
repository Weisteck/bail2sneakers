import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import CreateBasket from "../views/basket/GetBasket.vue"
import GetAllProduct from "../views/product/GetAllProducts.vue"
import DetailProduct from "../views/product/DetailProduct.vue";

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	// Basket
	{
		path: '/basket',
		name: 'createBasket',
		component: CreateBasket
	},

	// Product
	{
		path: '/product/get-all',
		name: 'getAllProducts',
		component: GetAllProduct
	},
	{
		path: '/product/:id',
		name: 'detailProduct',
		component: DetailProduct
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
