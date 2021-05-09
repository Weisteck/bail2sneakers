import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import CreateBasket from "../views/basket/CreateBasket.vue";
import process from 'process'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

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
