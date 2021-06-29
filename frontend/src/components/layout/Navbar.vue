<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/cart">Cart</router-link>
    |
    <router-link :to="{name: 'getAllProducts'}">Product</router-link>
    |
    <router-link to="/back-office/product/60acf6a894832a6396b9e9ab">Product details</router-link>
    |
    <router-link to="/back-office/product/create">Create product</router-link>
    |
    <router-link to="/back-office/product/edit/60acf6a894832a6396b9e9ab">Edit product</router-link>
    |
    <router-link to="/back-office/product/get-all">Get all products back office</router-link>
    |

    <button v-if="!user" class="btn cursor-pointer hover:text-blue-600 transition" @click="openLogin = true">Connexion | </button>
    <button v-if="!user" class="btn cursor-pointer hover:text-blue-600 transition" @click="openSignup = true"> Inscription</button>

    <div v-else>
      Bonjour {{ user.mail }}
      <button class="btn cursor-pointer hover:text-blue-600 transition" @click="logout"> | logout</button>
    </div>
  </div>

  <LoginModal v-if="openLogin" @login="loginUser" v-bind:open="openLogin" @close="openLogin = false"/>

  <SignupModal v-if="openSignup" @signup="signupUser" v-bind:open="openSignup" @close="openSignup = false"/>
</template>

<script>
import axios from "axios"
import LoginModal from "../../components/LoginModal.vue"
import SignupModal from "../../components/SignupModal.vue"

export default {
  name: 'Navbar',
  components: { LoginModal, SignupModal },
  data() {
    return {
      user: null,
      openLogin: false,
      openSignup: false,
      login: {
        email: null,
        password: null
      },
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

    loginUser(user) {
      this.user = user
      this.$store.commit('setUser', user)
      this.openLogin = false
    },

    signupUser(user) {
      this.user = user
      this.$store.commit('setUser', user)
      this.openSignup = false
    },

    async logout() {
      try {
        await axios.get('/api/authentication/logout')
        this.user = null
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>
