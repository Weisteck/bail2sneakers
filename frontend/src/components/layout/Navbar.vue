<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/cart">Cart</router-link>
    |
    <router-link to="/product/get-all">Product</router-link>
    |
    <router-link to="/product/60acf6a894832a6396b9e9ab">Product details</router-link>
    |
    <router-link to="/product/create">Create product</router-link>
    |
    <router-link to="/product/edit/60acf6a894832a6396b9e9ab">Edit product</router-link>
    |
    <router-link to="/back-office/product/get-all">Get all products back office</router-link>
    |

    <button v-if="!user" class="btn cursor-pointer hover:text-blue-600 transition" @click="login">login</button>

    <div v-else>
      Bonjour {{ user.mail }}
      <button class="btn cursor-pointer hover:text-blue-600 transition" @click="logout"> | logout </button>
    </div>

  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Navbar',
  data() {
    return {
      user: null
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get('/api/authentication/profile')
        this.user = response.data
      } catch (e) {
        this.user = null
        console.error(e.response.data)
      }
    },

    async login() {
      try {
        const response = await axios.post('/api/authentication/login', {
          email: "test@gmail.com",
          password: "trouDuCul"
        })

        this.user = response.data
      } catch (e) {
        console.error(e)
      }
    },

    async logout() {
      try {
        const response = await axios.get('/api/authentication/logout')
        this.user = null
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
