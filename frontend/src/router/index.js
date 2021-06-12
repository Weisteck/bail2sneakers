import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import CreateCart from "../views/client/cart/GetCart.vue"
import GetAllProducts from "../views/client/product/GetAllProducts.vue"
import GetAllProductsBackOffice from "../views/backoffice/product/GetAllProducts.vue"
import DetailProduct from "../views/client/product/DetailProduct.vue";
import CreateProduct from "../views/backoffice/product/CreateProduct.vue";
import EditProduct from "../views/backoffice/product/EditProduct.vue";

const routes = [
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
		component: GetAllProducts
	},
	{
		path: '/product/:id',
		name: 'detailProduct',
		component: DetailProduct
	},
	{
		path: '/product/create',
		name: 'createProduct',
		component: CreateProduct
	},
	{
		path: '/product/edit/:id',
		name: 'editProduct',
		component: EditProduct
	},
	{
		path: '/back-office/product/get-all',
		name: 'GetAllProductsBackOffice',
		component: GetAllProductsBackOffice
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
