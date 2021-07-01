import { createStore } from 'vuex'
import { api } from "../api/api";

export default createStore({
  state: {
    productBrand: [
      {
        name: "Adidas",
        brandDescription: `
					Adidas AG is a German multinational corporation, founded and headquartered 
					in Herzogenaurach, Germany, that designs and manufactures shoes, 
					clothing and accessories. It is the largest sportswear manufacturer in Europe, 
					and the second largest in the world, after Nike.
				`,
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png"
      },
      {
        name: "Nike",
        brandDescription: `
					Nike, Inc. is an American multinational corporation that is engaged in the design, 
					development, manufacturing, and worldwide marketing and sales of footwear, 
					apparel, equipment, accessories, and services.
				`,
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_nike_principal.jpg"
      }
    ],
  },
  mutations: {
  },
  actions: {
    // #region Product
    async getAllProducts() {
      try {
        return await api.get('/product/get-all')
      } catch (e) {
        console.error(e)
      }
    },

    async getProduct(context, payload) {
      try {
        return await api.get(`/product?id=${ payload.id }`)
      } catch (e) {
        console.error(e)
      }
    },

    async createProduct(context, payload) {
      try {
        return await api.post('/product', payload)
      } catch (e) {
        console.error(e)
      }
    },

    async editProduct(context, payload) {
      try {
        return await api.put(`/product?id=${ payload.id }`, payload)
      } catch (e) {
        console.error(e)
      }
    },

    async deleteProduct(context, payload) {
      try {
        return await api.delete(`/product?id=${ payload.id }`, payload)
      } catch (e) {
        console.error(e)
      }
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

    putCart(context, payload) {
      try {
        return api.put(`/cart?id=${ payload.id }`, { status: payload.status })
      } catch (e) {
        console.error(e)
      }
    },

    getCarts() {
      try {
        return api.get('cart/get-all')
      } catch (e) {
        console.error(e)
      }
    },

    getCartsByStatus(context, payload) {
      try {
        return api.get(`cart/get-by-status?status=${ payload.status }`)
      } catch (e) {
        console.error(e)
      }
    },

    // #endregion

    // #region checkout

    async createCheckoutSession(context, payload) {
      try {
        return await api.post('/payment/create-checkout-session', payload)
      } catch (e) {
        console.error(e)
      }
    },

    async getSessionData(context, payload) {
      try {
        return await api.get('/payment/checkout-session?id=' + payload)
      } catch (e) {
        console.error(e)
      }
    },

    // #endregion
    
    // #region checkout
    
    async getUsers() {
      try {
        return await api.get('/user/get-all')
      } catch (e) {
        console.error(e)
      }
    }
    
    // #endregion
  },
  modules: {}
})
