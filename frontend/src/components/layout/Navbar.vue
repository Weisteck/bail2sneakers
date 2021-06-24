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


    <button v-if="user" class="btn" @click="login">login -</button>

    <div v-else>
      Bonjour {{ user.mail }}
      |
    </div>
    <button class="btn" @click="logout">logout</button>
    <button class="btn" @click="getUser">get user</button>

  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Navbar',
  data() {
    return {
      user: {}
    }
  },
  created() {
    // this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get('/api/authentication/get-user')
        console.log("get user: ", response.data)
        this.user = response.data

      } catch (e) {
        console.error(e)
      }
    },

    async login() {
      try {
        const response = await axios.post('/api/authentication/login', {
          email: "test@gmail.com",
          password: "trouDuCul"
        })

        this.user = response.data
        console.log("response: ", response)
      } catch (e) {
        console.error(e)
      }
    },

    async logout() {
      try {
        const response = await axios.get('/api/authentication/logout')

        console.log("response: ", response)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
