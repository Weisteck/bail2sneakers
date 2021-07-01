<template>
  <div id="nav">
    <div class="w-full text-gray-700 bg-white">
      <div x-data="{ open: false }"
           class="flex flex-col  px-4 mx-auto md:items-center md:justify-between md:flex-row ">
        <div class="p-4 flex flex-row items-center justify-between">
          <router-link
            :to="{name: 'Accueil'}"
            class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded">
            <div class="grid grid-cols-2">
              <div class="col-span-1 mt-4">
                <span>Bail2Sneakers </span>
              </div>
              <div class="col-span-1">
                <img src="@/assets/logo.png" alt="logo" class="w-16">
              </div>
            </div>

          </router-link>
          <button class="md:hidden rounded" @click="open = !open">
            <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
              <path x-show="!open" fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clip-rule="evenodd"></path>
              <path x-show="open" fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <nav :class="{'flex': open, 'hidden': !open}"
             class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
          <router-link
            :to="{name: 'getAllProducts'}"
            class="px-4 py-2 mt-2 md:mt-0 text-sm font-semibold text-gray-50 bg-brown-1 rounded  hover:text-gray-50 hover:bg-brown-1"
            href="#">
            Parcourir les produits
          </router-link>

          <div v-if="user.role === 'ADMIN'" class="ml-5 mt-1">
            <router-link
              :to="{name: 'createProduct'}"
              class="text-center px-2 py-2 mt-2 md:mt-0 text-sm font-semibold bg-transparent rounded hover:text-gray-500 hover:bg-brown-1"
            >
              CREER UN PRODUIT
            </router-link>
            <router-link
              :to="{name: 'getAllProducts'}"
              class="text-center px-2 py-2 mt-2 md:mt-0 text-sm font-semibold bg-transparent rounded hover:text-gray-500 hover:bg-brown-1"
            >
              VOIR LES PRODUITS
            </router-link>
            <router-link
              :to="{name: 'getUsers'}"
              class="text-center px-2 py-2 mt-2 md:mt-0 text-sm font-semibold bg-transparent rounded hover:text-gray-500 hover:bg-brown-1"
            >
              VOIR LES UTILISATEURS
            </router-link>
          </div>

          <div v-if="user.role === ''">
            <button @click="openLogin = true"
                    class="py-2 mt-2 text-sm font-semibold bg-transparent rounded md:mt-0 md:ml-4 hover:text-gray-500 hover:bg-brown-1"
            >
              Connexion
            </button>
            <button @click="openSignup = true"
                    class="py-2 mt-2 text-sm font-semibold bg-transparent rounded md:mt-0 md:ml-4 hover:text-gray-500  hover:bg-brown-1"
            >
              Inscription
            </button>
          </div>

          <template v-else>
            <div class="border-l">
              <span class="px-3 pt-1">
              Bonjour {{ user.lastName }} {{ user.firstName }}
              <button @click="logout"
                      class="mr-2 py-2 mt-2 text-sm font-semibold bg-transparent rounded md:mt-0 md:ml-4 hover:text-gray-500 hover:bg-brown-1"
              >
                Deconnexion
              </button>
              </span>
            </div>

            <router-link
              to="/cart"
              class="ml-4 px-4 py-2 mt-2 text-sm font-semibold text-gray-50 bg-brown-1 rounded md:mt-0 hover:text-gray-50 hover:bg-brown-1 md:mt-0 text-sm font-semibold text-gray-50 bg-brown-1 rounded  hover:text-gray-50 hover:bg-brown-1"
              v-if="user.role === 'CLIENT'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </router-link>
          </template>
        </nav>
      </div>
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
      user: {
        firstName: "",
        lastName: "",
        role: "",
        mail: ""
      },
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
        this.user = {
          firstName: "",
            lastName: "",
            role: "",
            mail: ""
        }
        console.error(e.response.data)
      }
    },

    loginUser(user) {
      this.user = user
      this.openLogin = false
    },

    signupUser(user) {
      this.user = user
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
<style>

.bg-brown-1 {
  background-color: #4B3838;
}

.bg-brown-1:hover {
  background-color: #786362;
}
</style>
