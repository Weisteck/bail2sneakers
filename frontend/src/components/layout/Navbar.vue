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

    <button v-if="!user" class="btn cursor-pointer hover:text-blue-600 transition" @click="openLogin = true">login</button>

    <div v-else>
      Bonjour {{ user.mail }}
      <button class="btn cursor-pointer hover:text-blue-600 transition" @click="logout"> | logout</button>
    </div>
  </div>

  <LoginModal v-if="openLogin" @login="loginUser" v-bind:open="openLogin" @close="closeModal"/>
</template>

<script>
import axios from "axios"
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'
import LoginModal from "../../components/LoginModal.vue"

export default {
  name: 'Navbar',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationIcon,
    LoginModal
  },
  data() {
    return {
      user: null,
      openLogin: false,
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
      console.log("emit")

      this.user = user
      this.openLogin = false
    },

    async logout() {
      try {
        const response = await axios.get('/api/authentication/logout')
        this.user = null
      } catch (e) {
        console.error(e)
      }
    },

    closeModal() {
      this.openLogin = false
    }
  }
}
</script>
