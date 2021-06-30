import { createRouter, createWebHistory } from 'vue-router'
import { Role } from '../_helpers/role';
import { api } from "../api/api";

import Home from '../views/Home.vue'
import CreateCart from "../views/client/cart/GetCart.vue"
import GetAllProducts from "../views/client/product/GetAllProducts.vue"
import GetAllProductsBackOffice from "../views/backoffice/product/GetAllProducts.vue"
import DetailProduct from "../views/client/product/DetailProduct.vue"
import CreateProduct from "../views/backoffice/product/CreateProduct.vue"
import EditProduct from "../views/backoffice/product/EditProduct.vue"
import Success from "../views/client/payment/Success.vue"
import Cancel from "../views/client/payment/Cancel.vue"
import Checkout from "../views/client/payment/Checkout.vue"
import GetCarts from "../views/backoffice/cart/GetCarts.vue"
import NotAuthorized from "../views/redirect/NotAuthorized.vue"
import Login from "../views/client/authentication/Login.vue"
import Signup from "../views/client/authentication/Signup.vue"
import getAllUsers from "../views/backoffice/user/getAllUsers.vue"

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
  {
    path: '/orders',
    name: 'GetCarts',
    component: GetCarts,
    meta: { authorize: [ Role.Vendeur, Role.Admin ] }
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
    path: '/back-office/product/create',
    name: 'createProduct',
    component: CreateProduct,
    meta: { authorize: [ Role.Vendeur, Role.Admin ] }
  },
  {
    path: '/back-office/product/edit/:id',
    name: 'editProduct',
    component: EditProduct,
    meta: { authorize: [ Role.Vendeur, Role.Admin ] }
  },
  {
    path: '/back-office/product/get-all',
    name: 'GetAllProductsBackOffice',
    component: GetAllProductsBackOffice,
    meta: { authorize: [ Role.Vendeur, Role.Admin ] }
  },
  {
    path: '/checkout/success',
    name: 'success',
    component: Success
  },
  {
    path: '/checkout/cancel',
    name: 'cancel',
    component: Cancel
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  },

  // Redirect
  {
    name: 'notAuthorized',
    path: '/not-authorized',
    component: NotAuthorized
  },

  // Authentication
  {
    name: 'login',
    path: '/authentication/login',
    component: Login
  },
  {
    name: 'signup',
    path: '/authentication/signup',
    component: Signup
  },

  // Users
  {
    name: 'getUsers',
    path: '/back-office/user/get-all',
    component: getAllUsers
  },
  {
    name: 'createUser',
    path: '/back-office/user/create'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.authorize)) {
    try {
      const userResponse = await api.get(`/authentication/profile`)

      if (!to.meta.authorize.includes(userResponse.data.role))
        next({
          path: '/not-authorized'
        })
      else {
        next()
      }
    } catch (e) {
      next({
        path: '/authentication/login'
      })
      console.error("Aucun utilisateur n'est connecté.", e)
    }
  } else
    next()
})

export default router
