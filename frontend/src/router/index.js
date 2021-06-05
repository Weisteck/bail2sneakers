import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import CreateCart from "../views/cart/GetCart.vue"
import GetAllProduct from "../views/product/GetAllProducts.vue"
import DetailProduct from "../views/product/DetailProduct.vue";

const routes = [
	{
		path: '/test',
		name: 'Test',
		component: Test
	},
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	// Cart
	{
		path: '/cart',
		name: 'createCart',
		component: CreateCart
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
